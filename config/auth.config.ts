import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { ROUTES } from './routes';
import { IUser } from '@/types/user.type';
import { z } from 'zod';
import { getRoutesFromMiddleware } from '@/utils/next.utils';
import { getCurrentUser, loginWithGoogle, signUpWiGoogle } from '@/server/mutations/auth.mutations';
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
        isProtectedRoutes,
        logoutRoute
      } = getRoutesFromMiddleware(nextUrl.pathname);

      // should not protect nor redirect logout route
      if (isLogoutRoute) return false;

      // get current user from database
      // TODO: use auth.user.origin !== 'parse' to get user from other providers
      const currentUser = await getCurrentUser(auth?.token);

      // if session error (expired, or invalid), redirect to logout
      if (!!currentUser?.error) {
        return Response.redirect(new URL(logoutRoute, nextUrl));
      }

      const isLoggedIn = !!currentUser;

      // redirect to login if not logged in in protected routes
      if ((isDashboard || isProtectedRoutes)) {
        // remain in the current route
        if (isLoggedIn) return true;
        // go to login
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
      async authorize(credentials: { email: string; password: string }): Promise<IUser | null> {
        // check if credentials are valid
        const parsedCredentials = z
          .object({ email: z.string().email(), password: PasswordFieldSchema })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        // login with parse server
        const { email, password } = parsedCredentials.data;
        const user = await Parse.User.logIn(email, password);

        if (!user) return null;

        return user.toJSON() as IUser;
      },
    } as any),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      // --------------------------------- //
      // ---------- google auth ---------- //
      // --------------------------------- //
      /**
       * google auth does not know if we are login or sign up,
       * so we should check it manually
       */
      if (user && account?.provider === "google") {
        const defaultValues = {
          email: profile.email,
          password: account.providerAccountId,
        }

        const isUserExists = await Parse.Cloud.run('checkIfUserExists', { email: defaultValues.email });

        // ------------------------------- //
        // ------------ login ------------ //
        // ------------------------------- //
        if (isUserExists) {
          const loggedInUser = await loginWithGoogle(defaultValues);

          user.id = loggedInUser.id;
          user.token = loggedInUser.getSessionToken();

          return true;
        };
        
        // ------------------------------- //
        // ------------ signup ----------- //
        // ------------------------------- //
        const values = {
          ...defaultValues,
          firstName: profile.given_name,
          lastName: profile.family_name,
          image: {
            url: profile.picture,
            publicId: user.id,
          },
          verified: profile.email_verified,
        };

        // create the account to the database
        const newUser = await signUpWiGoogle(values, profile.sub);

        user.id = newUser.id;
        user.token = newUser.getSessionToken();

        return !!newUser;
      }

      return true;
    },
    async jwt({ token, user, account }: { token: any; user: IUser; account: any }) {
      if (user) {
        if (account && account.type === "credentials") {
          token.sessionToken = user.sessionToken;
          token.name = user.firstName + ' ' + user.lastName;
          token.id = user.objectId;
          token.provider = 'parse';
        } else if (account && account.provider === "google") {
          token.sessionToken = user.token;
          token.name = user.name;
          token.id = user.id; // random not fixed id
          token.provider = 'google';
        }
      }

      return token;
    },
    async session({ token, session }: any) {
      session.token = token.sessionToken;
      session.user.id = token.id;
      session.user.provider = token?.provider;

      return session;
    },
    ...authConfig.callbacks,
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(customAuthConfig as any)