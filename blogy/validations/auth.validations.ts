import { object, string } from 'zod';
import { zfd } from 'zod-form-data';

import { errorMap } from '@/config/zod';
import { capitalizeFirstLetter } from '@/utils/user.utils';

const PasswordFieldSchema = zfd.text(
  string()
  .min(8, 'error.min')
  .max(64, 'error.max')
);

const UserSchema = {
  email: zfd.text(
    string()
      .email({ message: 'error.required' })
      .max(120, 'error.max')
      .refine(value => value.toLowerCase())
  ),
  password: PasswordFieldSchema,
};

const PasswordConfirmationFieldSchema = zfd.text(string().min(
  1,
  'error.required',
));

export const SignUpSchema = zfd.formData(
  object({
    ...UserSchema,
    passwordConfirmation: PasswordConfirmationFieldSchema,
    lastName:  zfd.text(string({ errorMap })
      .min(1,'error.required')
      .max(112, 'error.max')
      .transform(capitalizeFirstLetter)),
    firstName: zfd.text(string({ errorMap })
      .max(112, 'error.max')
      .optional()
      .transform((value: any) => (value ? capitalizeFirstLetter(value) : ''))),
  })
  // compare the password and confirm password fields
  .refine((value: any) => value.password === value.passwordConfirmation, {
    message: 'error.passwordNotMatch',
    path: ['passwordConfirmation'],
  })
);

export const LoginSchema = zfd.formData(
  object(UserSchema)
);