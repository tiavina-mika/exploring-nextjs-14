import Title from '@/components/typography/Title';
import Text from '@/components/typography/Text';
import Container from '@/components/Container';
import { IInfo } from '@/types/app.type';

type Props = {
  sections: IInfo[];
}
const HomeAdvantages = ({ sections }: Props) => {
  return (
    <Container
      as="section"
      className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-9 py-9 lg:py-0 lg:min-h-[500px] lg:px-20"
      withSpacingY={false}
    >
      {sections.map((section) => (
        <div key={section.title} className="flex flex-col gap-2 lg:gap-4 lg:items-center">
          <Title level="h2" className="lg:text-center lg:text-3xl font-bold !leading-tight">{section.title}</Title>
          <Text className="lg:text-center lg:text-md">{section.description}</Text>
        </div>
      ))}
    </Container>
  );
};

export default HomeAdvantages;
