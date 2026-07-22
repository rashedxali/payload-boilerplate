import type { Setting } from '@/payload-types'

type AnalyticsProvider = {
  id: string
}

export type PublicAnalyticsConfig = {
  facebookPixel: AnalyticsProvider | null
  googleAnalytics4: AnalyticsProvider | null
  googleTagManager: AnalyticsProvider | null
  microsoftClarity: AnalyticsProvider | null
}

function getEnabledProvider(
  provider?: Setting['googleTagManager'] | Setting['googleAnalytics4'] | null,
): AnalyticsProvider | null {
  if (provider?.status === 'enable' && provider.id) {
    return { id: provider.id }
  }

  return null
}

export function getPublicAnalyticsConfig(settings: Setting): PublicAnalyticsConfig {
  return {
    googleTagManager: getEnabledProvider(settings.googleTagManager),
    googleAnalytics4: getEnabledProvider(settings.googleAnalytics4),
    facebookPixel: getEnabledProvider(settings.facebookPixel),
    microsoftClarity: getEnabledProvider(settings.microsoftClarity),
  }
}
