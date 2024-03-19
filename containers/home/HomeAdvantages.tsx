import Title from '@/components/typography/Title';
import Text from '@/components/typography/Text';
import Container from '@/components/Container';
import { IInfo } from '@/types/app.type';

type Props = {
  sections: IInfo[];
}
const HomeAdvantages = ({ sections }: Props) => {
  return (
    <Container as="section" className="flex items-center gap-9 min-h-[500px] md:px-20" withSpacingY={false}>
      {sections.map((section) => (
        <div key={section.title} className="flex flex-col gap-4 items-center">
          <Title level="h2" className="md:text-center md:text-3xl font-bold !leading-tight">{section.title}</Title>
          <Text className="md:text-center md:text-md">{section.description}</Text>
        </div>
      ))}
    </Container>
  );
};

export default HomeAdvantages;
