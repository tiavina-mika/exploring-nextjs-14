'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import TextField from '@/components/forms/fields/TextField';
import Form from '@/components/forms/Form';

import { ContactSchema } from '@/validations/app.validations';
import { IContactInput } from '@/types/app.type';
import { setFormError } from '@/utils/utils';
import { createContact } from '@/server/mutations/app.mutations';
import { useState } from 'react';
import Alert from '@/components/Alert';
import { siteConfig } from '@/config/site';
import { Textarea } from '@/components/ui/Textarea';


const ContactForm = () => {
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const tForm = useTranslations('Form');
  const tContact = useTranslations('Contact');

  const form = useForm<IContactInput>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { email: '', name: '', message: '' }
  });

  const onSubmit = async (values: FormData) => {
    window.location.href = `mailto:${siteConfig.senderEmail}?subject=${tContact('subject')}&body=${values.get("message")}`;
    const data = await createContact(values) as any;
    form.reset();

    if (!data) return
    // ------- success ------- //
    if (data.data.success) {
      setEmailSent(true);
      return
    }

    // ------- error ------- //
    // display error for each field
    setFormError<IContactInput>(form, data, tForm, tContact);
  }

  return (
    <div className="space-y-6">
      {/* success alert message */}
      {emailSent && <Alert message={tContact('emailSent') || ''} color="success" open={!!emailSent} variant="outlined" canBeClosed={false} />}

      {/* form */}
      <Form
        form={form}
        action={onSubmit}
        primaryButtonText={tContact('send')}
        className="space-y-3"
       
      >
        <TextField
          name="email"
          placeholder={tContact('email')}
          required
          type="email"
        />
        <TextField
          name="name"
          placeholder={tContact('name')}
          required
        />
        <Textarea
          placeholder={tContact('message')}
          required
          name="message"
          rows={5}
        />
      </Form>
    </div>
  );
};

export default ContactForm;
