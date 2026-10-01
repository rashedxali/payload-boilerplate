import type { Payload } from 'payload'

import type { Setting } from '@/payload-types'

export type EmailConfig = {
  apiKey: string
  fromAddress: string
  fromName: string
}

export type RecaptchaConfig = {
  secretKey: string
  siteKey: string
}

export const DEFAULT_FROM_ADDRESS = 'onboarding@resend.dev'
export const DEFAULT_FROM_NAME = 'Payload CMS'

const clean = (value?: null | string): string => value?.trim() || ''

/**
 * Resolves Resend config: Settings global first, then env. Returns null when no API key
 * is available, which means email sending is disabled.
 */
export const resolveEmailConfig = (settings?: null | Setting): EmailConfig | null => {
  const email = settings?.integrations?.email
  const apiKey = clean(email?.resendApiKey) || clean(process.env.RESEND_API_KEY)

  if (!apiKey) return null

  return {
    apiKey,
    fromAddress:
      clean(email?.fromAddress) || clean(process.env.EMAIL_FROM_ADDRESS) || DEFAULT_FROM_ADDRESS,
    fromName: clean(email?.fromName) || clean(process.env.EMAIL_FROM_NAME) || DEFAULT_FROM_NAME,
  }
}

/**
 * Resolves reCAPTCHA config: Settings global first, then env. Returns null unless both the
 * site key and the secret key are available, which means reCAPTCHA is disabled.
 */
export const resolveRecaptchaConfig = (settings?: null | Setting): null | RecaptchaConfig => {
  const recaptcha = settings?.integrations?.recaptcha
  const siteKey = clean(recaptcha?.siteKey) || clean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)
  const secretKey = clean(recaptcha?.secretKey) || clean(process.env.RECAPTCHA_SECRET_KEY)

  if (!siteKey || !secretKey) return null

  return { secretKey, siteKey }
}

// Local API with default overrideAccess, so access-restricted secret fields are included.
const getSettings = (payload: Payload): Promise<Setting> =>
  payload.findGlobal({ slug: 'settings', depth: 0 })

export const getEmailConfig = async (payload: Payload): Promise<EmailConfig | null> =>
  resolveEmailConfig(await getSettings(payload))

export const getRecaptchaConfig = async (payload: Payload): Promise<null | RecaptchaConfig> =>
  resolveRecaptchaConfig(await getSettings(payload))

/**
 * Verifies a reCAPTCHA token. Always passes when reCAPTCHA is not configured.
 */
export const verifyRecaptcha = async (payload: Payload, token?: null | string): Promise<boolean> => {
  const config = await getRecaptchaConfig(payload)

  if (!config) return true
  if (!token) return false

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      body: new URLSearchParams({ response: token, secret: config.secretKey }),
      method: 'POST',
    })
    const data = (await res.json()) as { success?: boolean }

    return data.success === true
  } catch (err) {
    payload.logger.error({ err, msg: 'reCAPTCHA verification request failed' })
    return false
  }
}
