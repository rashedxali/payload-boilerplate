import { buildLlmsTxt, isLlmsTxtEnabled } from '@/utilities/buildRobotsTxt'
import { getCachedSettings } from '@/utilities/getSettings'

export async function GET() {
  const settings = await getCachedSettings()

  if (!isLlmsTxtEnabled(settings)) {
    return new Response('Not Found', { status: 404 })
  }

  return new Response(buildLlmsTxt(settings), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
