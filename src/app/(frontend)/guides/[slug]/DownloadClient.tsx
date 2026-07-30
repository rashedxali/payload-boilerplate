'use client'

import React, { useState } from 'react'

import { FadeIn } from '@/components/FadeIn'

export default function DownloadPageClient({
  guideTitle,
  fileUrl,
}: {
  guideTitle: string
  fileUrl: string
}) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    window.open(fileUrl, '_blank')
  }

  if (submitted) {
    return (
      <div className="container py-28 text-center">
        <h1 className="mb-4">Download started</h1>
        <p className="text-black/70">Your download should begin shortly.</p>
      </div>
    )
  }

  return (
    <div className="pb-16 pt-28">
      <div className="container max-w-lg">
        <FadeIn>
          <h1 className="mb-4">{guideTitle}</h1>
          <p className="mb-8 text-black/70">Fill in your details to download this guide.</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              required
              className="w-full rounded-lg border border-black/10 px-4 py-3"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              required
              type="email"
              className="w-full rounded-lg border border-black/10 px-4 py-3"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="w-full rounded-lg border border-black/10 px-4 py-3"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <button type="submit" className="nh-btn-primary w-full">
              Download Guide
            </button>
          </form>
        </FadeIn>
      </div>
    </div>
  )
}
