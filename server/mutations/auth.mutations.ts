'use server';

import { signIn, signOut } from "@/config/auth.config";
import { ROUTES } from "@/config/routes";
import { action } from "@/config/safeAction";
import env from "@/env";
import { ILoginInput, SignUpI, SignUpWithGoogleInput, SignUpWithGoogleToSaveInput } from "@/types/auth.type";
import { IUser, PlatformEnum } from "@/types/user.type";
import { setValues } from "@/utils/parse.utils";
import { SignUpSchema } from "@/validations/auth.validations";
import { AuthError } from "next-auth";
import { SafeAction } from "next-safe-action";
import { isRedirectError } from "next/dist/client/components/redirect";

const requiredFields = ['firstName', 'lastName', 'email', 'password', 'username', 'platform'];
const SIGNUP_PROPERTIES = new Set(requiredFields);
const GOOGLE_SIGNUP_PROPERTIES = new Set([...requiredFields, 'verified', 'image', 'authId', 'authProvider']);

type SingUpOutPut = {
  success: boolean;
};
export const signUp = action(
  SignUpSchema,
  async (values): Promise<SafeAction<typeof SignUpSchema, SingUpOutPut> | SingUpOutPut> => {

    const newValues: SignUpI = { ...values, username: values.email, platform: PlatformEnum.WEB };
    delete newValues.passwordConfirmation; // passwordConfirmation should not be saved to db

    // create the new user with corresponding fields
    const user = new Parse.User();
    setValues(user, newValues, SIGNUP_PROPERTIES);

    // sign up to parse server, by default it's a login
    await user.signUp();
    // so we should log out
    await Parse.User.logOut();

    return {
      success: true
    }
  },
);

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
      // redirection after login
      // it's from an url search params
      redirectTo: formData.get('redirect') as string
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

export const nextAuthSignInWithGoogle = async () => {
  try {
    // await signIn('google', { callbackUrl: ROUTES.dashboard });
    await signIn('google');
  } catch (err) {
    if (isRedirectError(err)) {
      console.log(' ----- loginWithGoogle err', err);
      throw err;
    }
  }
}

/**
 * signup with google
 * no need to enter manually (via form) the email and password
 * @param values
 * @param authId
 * @returns
 */
export const signUpWiGoogle = async (values: SignUpWithGoogleInput, authId: string): Promise<Parse.User> => {
  try {
    const newValues: SignUpWithGoogleToSaveInput = {
      ...values,
      username: values.email as string,
      platform: PlatformEnum.WEB,
      authProvider: 'google',
      authId,
    };

    // create the new user with corresponding fields
    const user = new Parse.User();
    setValues(user, newValues, GOOGLE_SIGNUP_PROPERTIES);

    const newUser = await user.signUp();
    return newUser;
  } catch (err) {
    console.log(' ----- signUpWiGoogle err', err);
    throw err;
  }
}

export const loginWithGoogle = async (values: ILoginInput): Promise<Parse.User> => {
  try {
    const user = await Parse.User.logIn(values.email, values.password);

    return user;
  } catch (err) {
    console.log(' ----- loginWithGoogle err', err);
    throw err;
  }
}

export const getUserByAuthId = async (authId: string): Promise<Parse.User | undefined> => {
  try {
    const user = await Parse.Cloud.run('getUserByAuthId', { authId });

    return user;
  } catch (err) {
    console.log(' ----- getUserByAuthId err', err);
    throw err;
  }
}
/**
 * logout user to parse and next auth
 * if there is a redirect, it will redirect to the given url
 * if not go to home
 * @returns
 */
export const logout = async (redirect?: string | null) => {
  try {
    const redirectionUrl = redirect ? `${ROUTES.login}?redirect=${redirect}` : ROUTES.login;
    // logout next auth
    await signOut({ redirectTo: redirectionUrl });

    // logout parse user
    await Parse.User.logOut();
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
 * if error, it returns: { code: 209, error: 'Session token is expired.' }
 * @param sessionToken
 * @returns
 */
export const getCurrentUser = async (sessionToken: string | undefined): Promise<IUser | null | void> => {
  if (!sessionToken) return null;
  try {
    /**
     * endpoint
     * we are using directly endpoint/parse instead of Parse.serverUrl
     * because sometimes we are using it outside of the parse sdk reach and the server action
     */
    const url = env.SERVER_URL + '/parse';

    const response = await fetch(url + '/users/me', {
      method: 'GET',
      headers: {
        'X-Parse-Application-Id': env.PARSE_APP_ID,
        'X-Parse-Session-Token': sessionToken,
      }
    });

    const user = await response.json();
    return user;
  } catch (error) {
    console.log(' ------ getCurrentUser error: ', error);
  }
};
