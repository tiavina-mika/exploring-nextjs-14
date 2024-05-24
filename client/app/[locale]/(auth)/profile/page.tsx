import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';
import { getCurrentUser } from '@/server/mutations/auth.mutations';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/Table';
import { auth } from '@/config/auth.config';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// ----------------------------- //
// -------- metadata ----------- //
// ----------------------------- //
type MetaDataProps = {
  params: { locale: Locale }
}

export const generateMetadata = async ({ params: { locale }}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata',
  });

  return {
    title: t('profile.metaTitle'),
    description: t('profile.metaDescription'),
  };
}

// ----------------------------- //
// ------------ page ----------- //
// ----------------------------- //
type Props = {
  params: {
    locale: Locale;
  };
};

const ProfilePage = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Auth');
  const session = await auth();
  const currentUser = await getCurrentUser(session?.token as string);

  if (!currentUser) {
    notFound();
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{t('firstName')}</TableCell>
          <TableCell>{currentUser.firstName || "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">{t('lastName')}</TableCell>
          <TableCell>{currentUser.lastName || "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">{t('email')}</TableCell>
          <TableCell>{currentUser.email || "-"}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ProfilePage;
