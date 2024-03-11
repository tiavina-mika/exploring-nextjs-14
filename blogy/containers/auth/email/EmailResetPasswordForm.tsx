'use client';

import Form from '@/components/forms/Form';
import TextField from '@/components/forms/fields/TextField';
import { EmailInput } from '@/types/auth.type';
import { EmailSchema } from '@/validations/auth.validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

const EmailResetPasswordForm = () => {
  const tAuth = useTranslations('Auth');

  const form = useForm<EmailInput>({
    resolver: zodResolver(EmailSchema),
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
        name="email"
        placeholder={tAuth('email')}
        type="email"
        required
      />
    </Form>
  );
};

export default EmailResetPasswordForm;
