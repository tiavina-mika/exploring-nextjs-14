'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import TextField from '@/components/forms/fields/TextField';
import Form from '@/components/forms/Form';
import { useRouter } from '@/config/navigation';
import { ROUTES } from '@/config/routes';
import { setFormError } from '@/utils/utils';

import { SignUpSchema } from '@/validations/auth.validations';
import { ISignUpInput } from '@/types/auth.type';
import { signUp } from '@/server/auth.server.actions';

type Props = {
  id?: string;
};
const SignUpForm = ({ id }: Props) => {
  const router = useRouter();
  const tForm = useTranslations('Form');
  const tAuth = useTranslations('Auth');

  const form = useForm<ISignUpInput>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (values: FormData) => {
    const data = await signUp(values);

    if (!data) return
    // ------- success ------- //
    if ((data.data as any)?.success) {
      // go to preview
      router.push(ROUTES.login);
      return
    }

    // ------- error ------- //
    // display error for each field
    setFormError<ISignUpInput>(form, data, tForm, tAuth);
  }

  return (
    <Form
      form={form}
      action={onSubmit}
      primaryButtonText={tForm('save')}
    >
      <TextField
        name="email"
        placeholder={tAuth('email')}
        type="email"
        required
      />
      <TextField name="firstName" placeholder={tAuth('firstName')} />
      <TextField name="lastName" placeholder={tAuth('lastName')} required />
      <TextField name="password" placeholder={tAuth('password')} required type="password" />
      <TextField
        name="passwordConfirmation"
        placeholder={tAuth('confirmPassword')}
        required
        type="password"
      />
    </Form>
  );
};

export default SignUpForm;
