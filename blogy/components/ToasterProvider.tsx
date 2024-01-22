'use client';

import { toast, ToastBar, Toaster } from 'react-hot-toast';

import Button from './buttons/Button';
import NextIcon from './NextIcon';

/** @see https://react-hot-toast.com */
const ToasterProvider = () => (
  <Toaster
    position="bottom-right"
    containerClassName=""
    containerStyle={{}}
    reverseOrder
    gutter={8}
    toastOptions={{
      className: '',
      duration: 3500,
      style: {
        borderRadius: '18px',
        padding: '16px 24px',
        border: '1px solid #3f3f3f',
        background: 'black',
        color: 'white',
      },
      success: {
        duration: 3000,
        style: {
          background: 'green',
        },
      },
      error: {
        duration: 8000,
      },
    }}
  >
    {(t: any) => (
      <ToastBar toast={t} style={{ padding: 0, ...t.style }}>
        {({ icon, message }: any) => (
          <>
            {icon}
            {message}
            {t.type !== 'loading' && (
              <Button
                autoFocus
                onClick={() => toast.dismiss(t.id)}
                className="flex items-center justify-center bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
              >
                <NextIcon
                  alt=""
                  src="/icons/x2.svg"
                  width={18}
                  height={18}
                  aria-hidden="true"
                />
              </Button>
            )}
          </>
        )}
      </ToastBar>
    )}
  </Toaster>
);

export default ToasterProvider;
