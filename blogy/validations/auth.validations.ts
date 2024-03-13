import { object, string } from 'zod';
import { zfd } from 'zod-form-data';

import { errorMap } from '@/config/zod';
import { capitalizeFirstLetter } from '@/utils/user.utils';

export const PasswordFieldSchema = string()
  .min(8, 'error.min')
  .max(64, 'error.max');

const PasswordFormDataFieldSchema = zfd.text(PasswordFieldSchema);

export const EmailFieldSchema = string()
  .email({ message: 'error.required' })
  .max(120, 'error.max')
  .refine(value => value.toLowerCase());

const UserSchema = {
  email: zfd.text(EmailFieldSchema),
  password: PasswordFormDataFieldSchema,
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

export const ResetPasswordSchema = zfd.formData(
  object({
    newPassword: PasswordFieldSchema,
    newPasswordConfirmation: string().min(
      1,
      'error.required',
    ),
  })
  // compare the password and confirm password fields
  .refine(value => value.newPassword === value.newPasswordConfirmation, {
    message: 'form.error.passwordNotMatch',
    path: ['newPasswordConfirmation'],
  }) 
);

export const LoginSchema = zfd.formData(
  object(UserSchema)
);

export const EmailSchema = zfd.formData({
  email: EmailFieldSchema
});
