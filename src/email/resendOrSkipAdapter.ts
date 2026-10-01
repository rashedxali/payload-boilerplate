import type { EmailAdapter } from 'payload'

import { resendAdapter } from '@payloadcms/email-resend'

import {
  DEFAULT_FROM_ADDRESS,
  DEFAULT_FROM_NAME,
  getEmailConfig,
} from '@/utilities/getIntegrationsConfig'

/**
 * Sends through Resend when an API key is configured (Settings global, then env).
 * Without a key, emails are skipped so form submissions are still recorded in the CMS.
 */
export const resendOrSkipAdapter = (): EmailAdapter => {
  return ({ payload }) => ({
    name: 'resend-or-skip',
    defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || DEFAULT_FROM_ADDRESS,
    defaultFromName: process.env.EMAIL_FROM_NAME || DEFAULT_FROM_NAME,
    sendEmail: async (message) => {
      const config = await getEmailConfig(payload)

      if (!config) {
        payload.logger.info('Email not configured; skipping send')
        return
      }

      return resendAdapter({
        apiKey: config.apiKey,
        defaultFromAddress: config.fromAddress,
        defaultFromName: config.fromName,
      })({ payload }).sendEmail(message)
    },
  })
}
