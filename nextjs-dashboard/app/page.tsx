import env from '@/env';
import ToggleTheme from '@/components/ToggleTheme';

const Page = () => {
  console.log('SERVER', env.SERVER);
  console.log('NEXT_PUBLIC_CLIENT', env.NEXT_PUBLIC_CLIENT);
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div>
        <ToggleTheme />
      </div>

    </main>
  );
};

export default Page;
