'use client';

import Form from '@/components/forms/Form';
import TextField from '@/components/forms/fields/TextField';
import { ResetPasswordInput } from '@/types/auth.type';
import { ResetPasswordSchema } from '@/validations/auth.validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

const ResetPasswordForm = () => {
  const tAuth = useTranslations('Auth');

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = async (values: FormData) => {
    console.log("values", values);
  }

  return (
    <Form
      form={form}
      action={onSubmit}
      primaryButtonText={tAuth('request')}
    >
      <TextField
        name="newPassword"
        placeholder={tAuth('newPassword')}
        type="newPassword"
        required
      />
      <TextField
        name="newPasswordConfirmation"
        placeholder={tAuth('confirmNewPassword')}
        type="newPasswordConfirmation"
        required
      />
    </Form>
  );
};

export default ResetPasswordForm;
