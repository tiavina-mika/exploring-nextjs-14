'use server';

import { signIn, signOut } from "@/config/auth.config";
import { ROUTES } from "@/config/routes";
import env from "@/env";
import { AuthError } from "next-auth";

/**
 * signing using next auth credentials (email and password)
 * @param prevState 
 * @param formData 
 * @returns 
 */
export const login = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
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

/**
 * logout user to parse and next auth
 * @returns 
 */
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

/**
 * get current user by session token
 * we need to use REST for this because parse sdk doesn't support session token
 * @param sessionToken 
 * @returns 
 */
export const getCurrentUser = async (sessionToken: string) => {
  try {
    const response = await fetch(Parse.serverURL + '/users/me', {
      method: 'GET',
      headers: {
        'X-Parse-Application-Id': env.PARSE_APP_ID,
        'X-Parse-Session-Token': sessionToken,
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('getCurrentUser error: ', error);
  }
};