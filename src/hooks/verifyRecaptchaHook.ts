import type { CollectionBeforeValidateHook } from 'payload'

import { APIError } from 'payload'

import { verifyRecaptcha } from '@/utilities/getIntegrationsConfig'

export const RECAPTCHA_HEADER = 'x-recaptcha-token'

export const verifyRecaptchaHook: CollectionBeforeValidateHook = async ({
  data,
  operation,
  req,
}) => {
  // Only public submissions are checked; logged in users and Local API calls pass through.
  if (operation !== 'create' || req.user || req.payloadAPI === 'local') return data

  const verified = await verifyRecaptcha(req.payload, req.headers.get(RECAPTCHA_HEADER))

  if (!verified) {
    throw new APIError('reCAPTCHA verification failed. Please try again.', 400)
  }

  return data
}
