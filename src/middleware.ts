import createMiddleware from 'next-intl/middleware';
import { auth } from './auth';
import { locales } from './navigation';

export default auth(
  createMiddleware({
    // A list of all locales that are supported
    locales: locales,
    localePrefix: 'as-needed',
    defaultLocale: 'en',
  })
);

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    '/',
    '/(bn|en)/:path*',
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
