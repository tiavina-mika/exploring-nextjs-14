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

const LoginForm = () => {
  const tForm = useTranslations('Form');
  const tAuth = useTranslations('Auth');


  const form = useForm<ILoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const [errorMessage, dispatch] = useFormState(login, undefined);

  return (
    <div>
      <Form
        form={form}
        action={dispatch}
        primaryButtonText={tForm('save')}
      >
        <TextField
          name="email"
          placeholder={tAuth('email')}
          type="email"
          required
        />
        <TextField name="password" placeholder={tAuth('password')} required type="password" />
      </Form>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
