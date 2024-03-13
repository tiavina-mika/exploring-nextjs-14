import TranslationClientProvider from '@/components/TranslationClientProvider';

import ContactForm from './ContactForm';

const ContactFormProvider = () => {
  return (
    <TranslationClientProvider rootKeys={['Form', 'Contact']}>
      <ContactForm />
    </TranslationClientProvider>
  );
};

export default ContactFormProvider;
