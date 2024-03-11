'use client';

import Form from '@/components/forms/Form';
import TextField from '@/components/forms/fields/TextField';
import { useRouter } from '@/config/navigation';
import { ROUTES } from '@/config/routes';
import { ResetPasswordInput } from '@/types/auth.type';
import { ResetPasswordSchema } from '@/validations/auth.validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

const ResetPasswordForm = () => {
  const tAuth = useTranslations('Auth');
  const t = useTranslations('Common');
  const router = useRouter();

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = (values: FormData) => {
    console.log("values", values);
    router.push(ROUTES.login);
  }

  return (
    <Form
      form={form}
      action={onSubmit}
      primaryButtonText={t('confirm')}
    >
      <TextField
        name="newPassword"
        placeholder={tAuth('newPassword')}
        type="password"
        required
      />
      <TextField
        name="newPasswordConfirmation"
        placeholder={tAuth('confirmNewPassword')}
        type="password"
        required
      />
    </Form>
  );
};

export default ResetPasswordForm;
