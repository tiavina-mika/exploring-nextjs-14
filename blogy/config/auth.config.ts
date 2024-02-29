import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { ROUTES } from './routes';
import { IUser } from '@/types/user.type';
import { z } from 'zod';
import { getProtectedRoutesInfos } from '@/utils/next.utils';
import { getCurrentUser } from '@/server/mutations/auth.mutations';
import { PasswordFieldSchema } from '@/validations/auth.validations';
 
export const authConfig = {
  pages: {
    signIn: ROUTES.login,
    signOut: ROUTES.logout,
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const {
        protectedHomeRoute,
        isDashboard,
        isLogoutRoute,
        loginRoute,
        isProtectedRoutes
      } = getProtectedRoutesInfos(nextUrl.pathname);

      // should not protect nor redirect logout route
      if (isLogoutRoute) return false;

      // get current user from database
      // TODO: use auth.user.origin !== 'parse' to get user from other providers
      const currentUser = await getCurrentUser(auth?.token);
      const isLoggedIn = !!currentUser;

      // redirect to login if not logged in in protected routes
      if ((isDashboard || isProtectedRoutes)) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL(loginRoute, nextUrl));
      } else if (isLoggedIn) {
        // if the url start with '/dashboard'
        if (isDashboard) {
          // go to /dashboard
          return Response.redirect(new URL(protectedHomeRoute, nextUrl));
        }

        // let the current redirection if routes other than child of '/dashboard'
        return true
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

const customAuthConfig = {
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials): Promise<IUser | null>{
        const parsedCredentials = z
          .object({ email: z.string().email(), password: PasswordFieldSchema })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        const user = await Parse.User.logIn(email, password);

        if (!user) return null;

        return user.toJSON() as IUser;
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log('signIn: ', { user, account, profile, email, credentials });
    //   return true
    // },
    async jwt({ token, user, account }: { token: any; user: IUser; account: any }) {
      if (user && account && account.type === "credentials") {
        token.sessionToken = user.sessionToken;
        token.name = user.firstName + ' ' + user.lastName;
        token.id = user.objectId;
      }

      return token;
    },
    async session({ token, session }: { token: any, session: any, user: IUser }) {
      // login from parse server credentials
      if (token?.sessionToken) {
        session.token = token.sessionToken;
        session.user.id = token.id;
        // user from parse server login
        session.user.origin = 'parse';
      }

      return session;
    },
    ...authConfig.callbacks,
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(customAuthConfig as any)