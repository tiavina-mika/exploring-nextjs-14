import { unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';
import Title from '@/components/typography/Title';
import Text from '@/components/typography/Text';
import Button from '@/components/buttons/Button';
import Container from '@/components/Container';
import NextIcon from '@/components/NextIcon';

const sections = [
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

const advantages = [
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
      {/* headers */}
      <header className="self-stretch flex flex-col items-center justify-center gap-8 min-h-[500px] bg-gray-200">
        <div className="max-w-md">
          <div className="self-stretch flex flex-col md:items-center gap-8">
            <Title level="h1" className="!text-6xl font-extrabold">
              Some title here
            </Title>
            <Text className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!
            </Text>
          </div>
          <div className="flex flex-row items-center gap-5 mt-9">
            <Button className="rounded-3xl py-3">
              Download the app
            </Button>
            <Button variant='outlined' className="rounded-3xl py-3">
              Download the app
            </Button>
          </div>
        </div>
      </header>

      <Container as="section" className="flex items-center gap-9 min-h-[500px] md:px-20">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-4 items-center">
            <Title level="h2" className="md:text-center md:text-3xl font-bold">{section.title}</Title>
            <Text className="md:text-center md:text-md">{section.description}</Text>
          </div>
        ))}
      </Container>

      <div className="flex md:justify-center bg-gray-200 self-stretch py-36">
        <Container className="flex items-center gap-9" maxWidth="lg">
          {/* left */}
          <div className="flex-1 stretchSelf flex flex-col md:items-center gap-6">
            <Title level="h2" className="md:text-5xl font-bold">
              A super interesting title here
            </Title>
            <Text className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!
            </Text>
            <div className="flex flex-col gap-6">
              {advantages.map(((advantage, index) => (
                <div key={advantage.title + index} className="flex self-stretch">
                  <div className="pr-6 py-2">
                    <NextIcon
                      alt={advantage.title}
                      width={32}
                      height={32}
                      src={advantage.icon}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Title level="h3" className="font-bold">
                      {advantage.title}
                    </Title>
                    <Text>
                      {advantage.description}
                    </Text>
                  </div>
                </div>
              )))}
            </div>
          </div>
          <div className="flex-1">
            Image here
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
