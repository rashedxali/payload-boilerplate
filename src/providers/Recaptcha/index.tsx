'use client'

import React, { createContext, use, useCallback, useMemo, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

type RecaptchaContextType = {
  /** Resolves a token, or null when reCAPTCHA is disabled or could not run. */
  execute: () => Promise<null | string>
}

const EXECUTE_TIMEOUT_MS = 20000

const RecaptchaContext = createContext<RecaptchaContextType>({
  execute: () => Promise.resolve(null),
})

export const RecaptchaProvider: React.FC<{
  children: React.ReactNode
  siteKey?: string
}> = ({ children, siteKey }) => {
  // The widget (and Google's script) is only mounted on the first execute call.
  const [mounted, setMounted] = useState(false)
  const instance = useRef<null | ReCAPTCHA>(null)
  const waiters = useRef<((recaptcha: ReCAPTCHA) => void)[]>([])

  const setInstance = useCallback((recaptcha: null | ReCAPTCHA) => {
    instance.current = recaptcha

    if (recaptcha) {
      waiters.current.forEach((resolve) => resolve(recaptcha))
      waiters.current = []
    }
  }, [])

  const execute = useCallback(async (): Promise<null | string> => {
    if (!siteKey) return null

    const run = async () => {
      const recaptcha =
        instance.current ??
        (await new Promise<ReCAPTCHA>((resolve) => {
          waiters.current.push(resolve)
          setMounted(true)
        }))

      try {
        return await recaptcha.executeAsync()
      } finally {
        recaptcha.reset()
      }
    }

    const timeout = new Promise<null>((resolve) => setTimeout(resolve, EXECUTE_TIMEOUT_MS, null))

    try {
      return await Promise.race([run(), timeout])
    } catch {
      return null
    }
  }, [siteKey])

  const value = useMemo(() => ({ execute }), [execute])

  return (
    <RecaptchaContext value={value}>
      {children}
      {siteKey && mounted && <ReCAPTCHA ref={setInstance} sitekey={siteKey} size="invisible" />}
    </RecaptchaContext>
  )
}

export const useRecaptcha = (): RecaptchaContextType => use(RecaptchaContext)
