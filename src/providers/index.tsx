import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { RecaptchaProvider } from './Recaptcha'

export const Providers: React.FC<{
  children: React.ReactNode
  recaptchaSiteKey?: string
}> = ({ children, recaptchaSiteKey }) => {
  return (
    <HeaderThemeProvider>
      <RecaptchaProvider siteKey={recaptchaSiteKey}>{children}</RecaptchaProvider>
    </HeaderThemeProvider>
  )
}
