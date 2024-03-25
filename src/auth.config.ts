import type { NextAuthConfig } from 'next-auth';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  rootRoute,
} from './routes';
import { add, format } from 'date-fns';

export const authConfig = {
  pages: {
    signIn: '/',
  },
  providers: [
    // added later in auth.ts
    // while this file is also used in non-Node.js environments
  ],

  callbacks: {
    authorized({ auth, request: { nextUrl, cookies, headers } }) {
      const isLoggedIn = !!auth;

      console.log('isLoggedIn', isLoggedIn);

      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      const isRootRoute = nextUrl.pathname === rootRoute;
      const isAuthRoute = authRoutes.includes(nextUrl.pathname);

      if (isApiAuthRoute) {
        return;
      }
      if (isRootRoute) {
        return Response.redirect(new URL('/auth', nextUrl));
      }
      if (isAuthRoute) {
        if (isLoggedIn) {
          if (cookies.get('shopId')?.value) {
            return Response.redirect(new URL('/home', nextUrl));
          }
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        return;
      }

      if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
          callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return Response.redirect(new URL(`/auth`, nextUrl));
      }
      return true;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig;
