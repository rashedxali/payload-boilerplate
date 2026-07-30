import { buildRobotsTxt, isRobotsTxtEnabled } from '@/utilities/buildRobotsTxt'
import { getCachedSettings } from '@/utilities/getSettings'

export async function GET() {
  const settings = await getCachedSettings()

  if (!isRobotsTxtEnabled(settings)) {
    return new Response('Not Found', { status: 404 })
  }

  return new Response(buildRobotsTxt(settings), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
