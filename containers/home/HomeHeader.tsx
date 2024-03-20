import Title from '@/components/typography/Title';
import Text from '@/components/typography/Text';
import Button from '@/components/buttons/Button';
import Container from '@/components/Container';

const HomeHeader = () => {
  return (
    <Container className="flex flex-col items-center" rootClassName="self-stretch justify-center min-h-[350px] md:min-h-[500px] bg-gray-200">
      <div className="max-w-md">
        <div className="self-stretch flex flex-col lg:items-center gap-4 md:gap-8">
          <Title level="h1" className="lg!text-6xl font-extrabold">
            Some title here
          </Title>
          <Text className="lg:text-center" size="lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!
          </Text>
        </div>
        <div className="flex flex-row items-center gap-5 mt-6 md:mt-9">
          <Button className="rounded-3xl py-3">
            Download the app
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default HomeHeader;
