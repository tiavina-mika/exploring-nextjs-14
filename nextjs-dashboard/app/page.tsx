import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Button from './ui/Button';

const Page = () => {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex bg-yellow-300 h-20 shrink-0 items-end rounded-lg p-4 md:h-52 gap-4">
        {/* <h1 className={secondaryFont}>Layout level 1</h1> */}
        <Button>Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="error">Error</Button>
        <Button color="success">Success</Button>
        <Button color="info">Info</Button>
        <Button color="warning">Warning</Button>
        <Button color="default">default</Button>
      </div>
      <div className="flex bg-yellow-300 h-20 shrink-0 items-end rounded-lg p-4 md:h-52  gap-4">
        {/* <h1 className={secondaryFont}>Layout level 1</h1> */}
        <Button variant="outlined">Primary</Button>
        <Button color="secondary" variant="outlined">Secondary</Button>
        <Button color="error" variant="outlined">Error</Button>
        <Button color="success" variant="outlined">Success</Button>
        <Button color="info" variant="outlined">Info</Button>
        <Button color="warning" variant="outlined">Warning</Button>
        <Button color="default" variant="outlined">default</Button>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Page