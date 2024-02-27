import NextAuth, { DefaultSession } from "next-auth"
import { IUser } from "./user.type"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    // maybe store another field later
    /**
     * name: string;
     * email: string;
     * id: string;
     */
    user: {} & DefaultSession["user"],
    token: string;
  }
}