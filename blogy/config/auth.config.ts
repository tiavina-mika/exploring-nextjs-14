import type { NextAuthConfig } from 'next-auth';
import { ROUTES } from './routes';
 
export const authConfig = {
  pages: {
    signIn: ROUTES.login,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('--------- auth: ', auth);
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;