import { getTranslations } from 'next-intl/server';
import { createSafeActionClient, DEFAULT_SERVER_ERROR } from 'next-safe-action';

export class ActionError extends Error {}

const handleReturnedServerError = async (e: Error) => {
  const t = await getTranslations('ServerError');
  // If the error is an instance of `ActionError`, unmask the message.
  if (e instanceof ActionError) {
    return e.message;
  }

  if (e instanceof Parse.Error) {
    // the message from the server should be a translation key
    return t(e.message as any);
  }

  // Otherwise return default error message.
  return DEFAULT_SERVER_ERROR;
};

export const action = createSafeActionClient({
  // You can provide a custom log Promise, otherwise the lib will use `console.error`
  // as the default logging system. If you want to disable server errors logging,
  // just pass an empty Promise.
  handleServerErrorLog: (e) => {
    console.error(
      'CUSTOM ERROR LOG FUNCTION, server error message:',
      e.message,
    );
  },
  handleReturnedServerError,
});
