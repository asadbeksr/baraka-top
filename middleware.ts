import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale: 'uz',
  // Add locales to all routes
  localePrefix: 'always'
});

export const config = {
  matcher: [
    // Match all paths that don't start with api, _next, or contain a dot (files)
    '/((?!api|_next|.*\\.[^/]*$).*)',
    // Also match root path
    '/'
  ]
};