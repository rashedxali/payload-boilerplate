import React from 'react'

export const AnalyticsDescription: React.FC = () => {
  return (
    <p className="mb-6 text-sm text-[var(--theme-elevation-500)]">
      Configure tracking for the headless frontend. The public site loads these via{' '}
      <code className="rounded bg-[var(--theme-elevation-100)] px-1.5 py-0.5 text-xs">
        GET /api/analytics
      </code>
      . Enable only the providers you use; GTM can host GA4 if you prefer a single container.
    </p>
  )
}
