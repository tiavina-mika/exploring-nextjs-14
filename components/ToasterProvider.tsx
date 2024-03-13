'use client';

import { toast, ToastBar, Toaster } from 'react-hot-toast';

import { cn } from '@/utils/app.utils';

import IconButton from './buttons/IconButton';
import NextIcon from './NextIcon';
import Text from './typography/Text';

/** @see https://react-hot-toast.com */
const ToasterProvider = () => (
  <Toaster
    position="bottom-right"
    containerStyle={{}}
    reverseOrder
    gutter={8}
    toastOptions={{
      className: '',
      duration: 3500,
      style: {
        width: 350,
        padding: 0,
      },
      success: {
        duration: 3000,
        className: '!bg-success',
      },
      error: {
        className: '!bg-error',
        duration: 8000,
      },
    }}
  >
    {(t: any) => {
      return (
        <ToastBar toast={t}>
          {(x) => {
            return (
              <div
                className={cn(
                  'pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5',
                  t.className,
                )}
              >
                <div className="w-0 flex-1 p-4">
                  <div className="flex items-start">
                    <div className="flex flex-col items-center justify-center self-stretch">
                      {x.icon}
                    </div>
                    <div className="flex-1">
                      <Text className="text-sm text-white">{x.message}</Text>
                    </div>
                  </div>
                </div>
                <div className="flex border-l border-gray-200">
                  {t.type !== 'loading' && (
                    <IconButton
                      autoFocus
                      onClick={() => toast.dismiss(t.id)}
                      className="hover:bg-grey-50"
                    >
                      <NextIcon
                        alt=""
                        src="/icons/x2-white.svg"
                        width={18}
                        height={18}
                        aria-hidden="true"
                      />
                    </IconButton>
                  )}
                </div>
              </div>
            );
          }}
        </ToastBar>
      );
    }}
  </Toaster>
);

export default ToasterProvider;
