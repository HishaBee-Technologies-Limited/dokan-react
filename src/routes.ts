/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/auth/new-verification'];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  '/auth',
  '/auth/pin',
  '/auth/error',
  '/auth/otp',
  '/auth/signup',
  '/auth/setup-pin',
  '/auth/new-password',
];

/**
 * The root route will be redirected to auth
 * The root route is currently not used
 * @type {string}
 */
export const rootRoute = '/';

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/shop';
