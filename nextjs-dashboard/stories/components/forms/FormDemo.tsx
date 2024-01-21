import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import TextField from '@/components/forms/fields/TextField';
import Form from '@/components/forms/Form';
import { errorMap } from '@/config/zod';

export const DemoSchema = (tForm?: any, tDemo?: any) => {
  return z.object({
    title: z
      .string({ errorMap })
      .min(1, tForm('error.required', { field: tDemo('title') }))
      .max(75, tForm('error.max', { field: tDemo('title'), number: 75 })),
  });
};

export type DemoInput = z.infer<ReturnType<typeof DemoSchema>>;

type Props = {
  withPlaceholder?: boolean;
  withDescription?: boolean;
  withError?: boolean;
};
const FormDemo = ({ withPlaceholder, withDescription, withError }: Props) => {
  const tForm = useTranslations('Form');
  const tDemo = useTranslations('Article');
  const tTest = useTranslations('Test');

  const form = useForm<DemoInput>({
    resolver: zodResolver(DemoSchema(tForm, tDemo)),
  });

  const { handleSubmit } = form;

  const onSubmitHandler: SubmitHandler<DemoInput> = async (values) => {
    console.log('values: ', values);
  };

  return (
    <Form form={form} onSubmit={handleSubmit(onSubmitHandler)}>
      <TextField
        name="title"
        label={tDemo('title')}
        required
        placeholder={withPlaceholder ? tTest('enterTitle') : ''}
        description={withDescription ? tTest('titleDescription') : ''}
        error={withError}
      />
    </Form>
  );
};

export default FormDemo;
