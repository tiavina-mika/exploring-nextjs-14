import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Title from '@/components/typography/Title';
import Text from '@/components/typography/Text';
import { TextLink } from '@/components/typography/TextLink';
import env from '@/env';
import Button from '../components/Button';

const Page = () => {
  console.log('SERVER', env.SERVER);
  console.log('NEXT_PUBLIC_CLIENT', env.NEXT_PUBLIC_CLIENT);
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex bg-yellow-300 h-20 shrink-0 items-end rounded-lg p-4 md:h-52 gap-4">
        <Button>Primary</Button>
        <TextLink href="/login" isExternal>Login </TextLink>

        <Button color="secondary">Secondary</Button>
        <Button color="error">Error</Button>
        <Button color="success">Success</Button>
        <Button color="info">Info</Button>
        <Button color="warning">Warning</Button>
        <Button color="default">default</Button>
      </div>
      <div />
      <div className="flex bg-yellow-300 h-20 shrink-0 items-end rounded-lg p-4 md:h-52  gap-4">
        <Button variant="outlined">Primary</Button>
        <Button color="secondary" variant="outlined">Secondary</Button>
        <Button color="error" variant="outlined">Error</Button>
        <Button color="success" variant="outlined">Success</Button>
        <Button color="info" variant="outlined">Info</Button>
        <Button color="warning" variant="outlined">Warning</Button>
        <Button color="default" variant="outlined">default</Button>
      </div>
      <div className="flex bg-yellow-300 h-20 shrink-0 items-end rounded-lg p-4 md:h-52  gap-4">
        <Title level="h1">Title h1</Title>
        <Title level="h2">Title h2</Title>
        <Title level="h3">Title h3</Title>
        <Title level="h4">Title h4</Title>
        <Title level="h5">Title h5</Title>
        <Title level="h6">Title h6</Title>
        <Title className="text-red-500">Title h1</Title>
      </div>
      <div className="flex bg-yellow-300 h-20 shrink-0 items-end rounded-lg p-4 md:h-52  gap-4">
        <Text size="xl">Text xl</Text>
        <Text size="lg" color="error">Text lg</Text>
        <Text size="md" color="success">Text md</Text>
        <Text size="sm" color="info">Text sm</Text>
        <Text size="xs" color="warning">Text xs</Text>
        <Text className="text-blue-500 text-3xl">Text default</Text>
      </div>
      <div className="flex bg-yellow-300 h-20 shrink-0 items-end rounded-lg p-4 md:h-52  gap-4">
        <Text size="xl" palette="dark">Text dark (default)</Text>
        <Text size="xl" palette="main">Text main</Text>
        <Text size="xl" palette="light">Text light</Text>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span>
            {' '}
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page;
