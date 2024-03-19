import Title from '@/components/typography/Title';
import Text from '@/components/typography/Text';
import Button from '@/components/buttons/Button';

const HomeHeader = () => {
  return (
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
  );
};

export default HomeHeader;
