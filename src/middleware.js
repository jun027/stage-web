// eslint-disable-next-line import/default
import createMiddleware from 'next-intl/middleware'
import { locales, localePrefix } from './navigation'

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'zh-CN',
})

export const config = {
  matcher: ['/', '/(zh-CN|zh-TW)/:path*'],
}
