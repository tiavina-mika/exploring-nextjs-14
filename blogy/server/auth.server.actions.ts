'use server';

import { SafeAction } from 'next-safe-action';

import { action } from '@/config/safeAction';
import { setValues } from '@/utils/parse.utils';

import { SignUpSchema } from '@/validations/auth.validations';
import { PlatformEnum } from '@/types/user.type';
import { SignUpI } from '@/types/auth.type';

const SIGNUP_PROPERTIES = new Set(['firstName', 'lastName', 'email', 'password', 'username', 'platform']);

type OutPut = {
  success: boolean;
};
export const signUp = action(
  SignUpSchema,
  async (values): Promise<SafeAction<typeof SignUpSchema, OutPut> | OutPut> => {

    const newValues: SignUpI = { ...values, username: values.email, platform: PlatformEnum.WEB };
    delete newValues.passwordConfirmation; // passwordConfirmation should not be saved to db

    // create the new user with corresponding fields
    const user = new Parse.User();
    setValues(user, newValues, SIGNUP_PROPERTIES);

    await user.signUp();
    await Parse.User.logOut()

    return {
      success: true
    }
  },
);
