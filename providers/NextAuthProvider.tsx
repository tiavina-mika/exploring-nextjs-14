'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
}

/**
 * access the session in a client components using useSession
 * in server component use auth() instead
 * @param param0 
 * @returns 
 */
const NextAuthProvider =({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthProvider;
