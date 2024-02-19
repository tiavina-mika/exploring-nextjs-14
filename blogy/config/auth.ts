import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { authConfig } from './auth.config';
import { IUser } from '@/types/user.type';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await Parse.User.logIn(email, password);

          if (!user) return null;

          return user.toJSON();
        }
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log('signIn: ', { user, account, profile, email, credentials });
    //   return true
    // },
    async jwt({ token, user }: { token: any, user: IUser }) {
      if (user) {
        token.sessionToken = user.sessionToken;
        token.name = user.firstName + ' ' + user.lastName;
        token.id = user.objectId;
      }

      return token;
    },
    async session({ token, session, user }: { token: any, session: any, user: IUser }) {
      // login from parse server credentials
      if (token?.sessionToken) {
        session.token = token.sessionToken;
        session.user.id = token.id;
      }

      return session;
    }
  },
} as any);