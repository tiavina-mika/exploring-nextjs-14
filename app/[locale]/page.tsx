import { unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';
import HomeHeader from '@/containers/home/HomeHeader';
import { IInfo } from '@/types/app.type';
import HomeAdvantages from '@/containers/home/HomeAdvantages';
import HomeFeatures from '@/containers/home/HomeFeatures';

const advantages: IInfo[] = [
  {
    title: "Voluptas doloribus asperiores ipsum",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum"
  },
  {
    title: "Quidem harum omnis beatae",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas doloribus aperiam. Quidem harum omnis beatae ipsum"
  },
  {
    title: "omnis beatae ipsum soluta adipisicing",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas doloribus aperiam. Quidem harum omnis beatae ipsum"
  }
];

const features = [
  {
    icon: "/icons/eye-off.svg",
    title: "Voluptas doloribus asperiores",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas doloribus beatae ipsum"
  },
  {
    icon: "/icons/google.svg",
    title: "Quidem harum omnis beatae",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas doloribus aperiam."
  },
  {
    icon: "/icons/user.svg",
    title: "omnis beatae ipsum soluta",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas doloribus aperiam."
  }
];

type Props = {
  params: {
    locale: Locale;
  };
};

const HomePage = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return (
    <div className="self-stretch flex flex-col md:items-center">
      <HomeHeader />
      <HomeAdvantages sections={advantages} />
      <HomeFeatures sections={features} />
    </div>
  );
};

export default HomePage;
