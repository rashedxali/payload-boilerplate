'use client'

import React, { useState } from 'react'

import { useRecaptcha } from '@/providers/Recaptcha'

export const FooterNewsletter: React.FC = () => {
  const { execute: executeRecaptcha } = useRecaptcha()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const token = await executeRecaptcha()

      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      })
      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setMessage(data.error || 'Subscription failed')
        return
      }

      setStatus('success')
      setMessage('Thanks for subscribing!')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <form className="flex flex-col gap-2 sm:flex-row" onSubmit={handleSubmit}>
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/60"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-lg bg-nh-blue px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {message && (
        <p className={`text-sm ${status === 'error' ? 'text-red-300' : 'text-green-300'}`}>
          {message}
        </p>
      )}
    </form>
  )
}
