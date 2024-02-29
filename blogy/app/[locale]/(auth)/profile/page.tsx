import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import { getCurrentUser } from '@/server/mutations/auth.mutations';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/Table';
import { auth } from '@/config/auth.config';

type Props = {
  params: {
    locale: Locale;
  };
};

const ProfilePage = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Auth')
  const session = await auth();
  const currentUser = await getCurrentUser(session?.token as string);
  
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div>
        <Title>My Profile</Title>
      </div>
      <div>
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
      </div>
    </main>
  );
};

export default ProfilePage;
