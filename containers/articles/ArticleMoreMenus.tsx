'use client';

import { ROUTES } from '@/config/routes';

import { useRouter } from '@/config/navigation';
import DropdownMenu from '@/components/DropdownMenu';
import { IMenuItem } from '@/types/app.type';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

// ----------------------------- //
// -------- metadata ----------- //
// ----------------------------- //
type Props = {
  articleId?: string;
  currentAction: 'preview' | 'edit' | 'list' | 'create';
};



// ----------------------------- //
// ------------ page ----------- //
// ----------------------------- //
const ArticleMoreMenus = ({ articleId, currentAction }: Props) => {
  const tArticle = useTranslations('Article');
  const t = useTranslations('Common');

  const router = useRouter();

  const goToPreview = (value: string) => router.push(ROUTES.articles.preview(value));
  const goToEdition = (value: string) => router.push(ROUTES.articles.edit(value));
  const goToCreation = () => router.push(ROUTES.articles.add);
  const goToList = () => router.push(ROUTES.articles.root);

  const menus: IMenuItem[] = useMemo(() => {
    const defaultOptions = [
      {
        label: t('returnToList'),
        onClick: goToList,
        id: 'list'
      },
      {
        label: t('addSomething', { value: tArticle('anArticle') }),
        onClick: goToCreation,
        id: 'create'
      },
    ];

    if (!articleId) return defaultOptions.filter((option) => (option as any).id !== currentAction);

    const options = [
      {
        label: t('seeSomething', { value: tArticle('theArticle') }),
        onClick: () => goToPreview(articleId),
        id: 'preview',
      },
      {
        label: t('editSomething', { value: tArticle('theArticle') }),
        onClick: () => goToEdition(articleId),
        id: 'edit',
      },
      ...defaultOptions,
    ];

    return options.filter((option) => (option as any).id !== currentAction);
  }, [articleId, tArticle, goToPreview]);

  return (
    <DropdownMenu menus={menus} />
  );
};

export default ArticleMoreMenus;
