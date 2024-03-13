import Link from 'next/link';

import { primaryFont } from '@/components/fonts';
import Title from '@/components/typography/Title';

const NotFound = () => (
  <html lang="en">
    <body className={`${primaryFont} antialiased dark:bg-neutral-900`}>
      <div className="flex min-h-screen flex-col items-center justify-center space-y-8">
        <Title className="text-4xl font-semibold">404 - Page Not Found</Title>

        <div className="space-x-4">
          <Link
            className="text-blue-600 underline duration-300 hover:text-red-500"
            href="/"
          >
            Homepage
          </Link>
          <Link
            className="text-blue-600 underline duration-300 hover:text-red-500"
            href="/contact"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </body>
  </html>
);
export default NotFound;
