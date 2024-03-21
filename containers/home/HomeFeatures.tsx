import Title from '@/components/typography/Title';
import Text from '@/components/typography/Text';
import Container from '@/components/Container';
import { IInfo } from '@/types/app.type';
import NextIcon from '@/components/NextIcon';
import Image from 'next/image';

type Props = {
  sections: IInfo[];
}
const HomeFeatures = ({ sections }: Props) => {
  return (
    <div className="flex md:justify-center bg-gray-200 self-stretch py-10 md:py-20 lg:py-36">
      <Container className="flex items-center flex-col lg:flex-row gap-16" maxWidth="lg" withSpacingY={false}>
        {/* left */}
        <div className="flex-1 stretchSelf flex flex-col md:items-center gap-6">
          <Title level="h2" className="md:text-5xl font-bold !leading-snug">
            A super interesting title here
          </Title>
          <Text className="text-lg md:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!
          </Text>
          <div className="flex flex-col gap-6">
            {sections.map(((section, index) => (
              <div key={section.title + index} className="flex self-stretch">
                {section.icon && (
                  <div className="pr-6 py-2">
                    <NextIcon
                      alt={section.title}
                      size={32}
                      src={section.icon}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <Title level="h3" className="font-bold">
                    {section.title}
                  </Title>
                  <Text>
                    {section.description}
                  </Text>
                </div>
              </div>
            )))}
          </div>
        </div>
        {/* right */}
        <div className="flex md:justify-end">
          <Image
            alt="phone"
            src="/images/phone-right.png"
            width={400}
            height={400}
          />
        </div>
      </Container>
    </div>
  );
};

export default HomeFeatures;
