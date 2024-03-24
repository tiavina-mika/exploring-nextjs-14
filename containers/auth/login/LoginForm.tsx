'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import TextField from '@/components/forms/fields/TextField';
import Form from '@/components/forms/Form';

import { LoginSchema } from '@/validations/auth.validations';
import { ILoginInput } from '@/types/auth.type';
import { useFormState } from 'react-dom';
import { login } from '@/server/mutations/auth.mutations';
import Text from '@/components/typography/Text';
import { useSearchParams } from 'next/navigation';
import { ROUTES } from '@/config/routes';

const LoginForm = () => {
  const tAuth = useTranslations('Auth');
  const searchParams = useSearchParams();

  const form = useForm<ILoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const [errorMessage, dispatch] = useFormState(login, undefined);

  return (
    <div>
      <Form
        form={form}
        action={dispatch}
        primaryButtonText={tAuth('login')}
        className="space-y-3"
      >
        {/* input for redirection from url search params */}
        {searchParams?.get('redirect') && <input type="hidden" name="redirect" value={searchParams.get('redirect') || ROUTES.dashboard} />}
        <TextField
          name="email"
          placeholder={tAuth('email')}
          type="email"
          required
        />
        <TextField name="password" placeholder={tAuth('password')} required type="password" />
      </Form>
      {errorMessage && (
        <div
          className="flex items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <Text className="text-sm" color="error">{errorMessage}</Text>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
