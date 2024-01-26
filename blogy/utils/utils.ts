import { ZodError, ZodIssue } from 'zod';

import { IActionError } from '@/types/app.type';

export const filter = (
  object: Record<string, any>,
  names: Record<string, any>,
): Record<string, any> => {
  return Object.keys(object)
    .filter((key) => (names.has ? names.has(key) : names.includes(key)))
    .reduce((obj, key) => {
      // eslint-disable-next-line no-param-reassign
      (obj as any)[key] = object[key];
      return obj;
    }, {});
};

/**
 * check if it's null ( 0, '', null, undefined, {}, [] )
 * @param item
 * @returns {boolean}
 */
export const isNull = (item: string | File): boolean => {
  // NOTE : typeof null = 'object', typeof undefined = 'undefined'
  // see Loose Equality Comparisons With == at ( https://www.sitepoint.com/javascript-truthy-falsy )
  const typeOfValue = typeof item;
  switch (typeOfValue) {
    case 'string':
      return (item as string).trim() === '';
    case 'object':
      return (
        Object.is(item, null) || Object.values(item).every((val) => isNull(val))
      );
    case 'number':
      return !item;
    default:
      return item == null;
  }
};

export const catchError = (error: unknown): IActionError => {
  if (error instanceof ZodError) {
    const errors = error.issues.map((issue: ZodIssue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));

    return {
      success: false,
      errors,
    };
  }
  if (error instanceof Error) {
    return {
      message: error.message,
      success: false,
    };
  }
  return {
    success: false,
    message: 'Something went wrong, please try again later.',
  };
};
