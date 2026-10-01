import { getPayload } from 'payload'

import config from '../payload.config'

/**
 * Seeds the default admin user from ADMIN_DEFAULT_USER_EMAIL / ADMIN_DEFAULT_USER_PASSWORD.
 * Safe to run repeatedly: an existing user with that email is left untouched.
 *
 * Run with `bun run seed`.
 */
const seedAdmin = async (): Promise<void> => {
  const email = process.env.ADMIN_DEFAULT_USER_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_DEFAULT_USER_PASSWORD

  if (!email || !password) {
    throw new Error(
      'ADMIN_DEFAULT_USER_EMAIL and ADMIN_DEFAULT_USER_PASSWORD must both be set to seed the admin user.',
    )
  }

  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'users',
    depth: 0,
    limit: 1,
    where: { email: { equals: email } },
  })

  if (existing.totalDocs > 0) {
    payload.logger.info(`Admin user ${email} already exists; skipping.`)
    return
  }

  await payload.create({
    collection: 'users',
    data: { name: 'Admin', email, password },
  })

  payload.logger.info(`Admin user ${email} created.`)
}

try {
  await seedAdmin()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
