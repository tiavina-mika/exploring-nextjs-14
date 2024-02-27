'use server';

import { signIn, signOut } from "@/config/auth";
import { ROUTES } from "@/config/routes";
import { AuthError } from "next-auth";

export const login = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      // ...formData,
      // redirect: false
      redirectTo: '/'
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export const logout = async () => {
  try {
    // logout parse user
    await Parse.User.logOut();
    // logout next auth
    await signOut({ redirectTo: ROUTES.login});
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}