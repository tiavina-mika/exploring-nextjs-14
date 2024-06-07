import { useTranslations } from 'next-intl';

import Text from './typography/Text';

const UnknownError = () => {
  const t = useTranslations('Error');
  return <Text>{t('unknown')}</Text>;
};

export default UnknownError;
