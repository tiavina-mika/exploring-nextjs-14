import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ZodError, ZodIssue } from 'zod';
import { HookActionStatus } from 'next-safe-action/hooks';

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

/**
 * TODO: remove this function, it's actually not used
 * @param error
 * @returns
 */
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

/**
 * set the RHF errors from safe-action result and display it to the user
 * @see: https://next-safe-action.dev/docs/usage-from-client/action-result-object
 * @param form useForm
 * @param result data return by safe-action
 * @param tForm form translation (mainly error messages)
 * @param t entity translation (article, user, ...)
 */
export const setFormError = <I extends FieldValues>(
  form: UseFormReturn<I>,
  result: any,
  tForm: any,
  t: any,
) => {
  // form errors
  if (result.validationErrors) {
    const errors = result.validationErrors;
    for (const key of Object.keys(errors)){
      let errorMessage = '';

      switch (key) {
        // the id is not a field, so we don't need to specify the field name
        case "id":
          errorMessage = tForm(errors[key][0]);
          break;
        case "_root":
          errorMessage = tForm('error.invalidInput');
          break;
        default:
          errorMessage = tForm(errors[key][0], { field: t(key) });
          break;
      }
      if (key === "_root") {
        errorMessage = tForm('error.invalidInput');
      }
 
      form.setError(key as FieldPath<I>, {
        type: 'manual',
        message: errorMessage,
      });
    }
  }

  // server action error
  if (result.serverError) {
    toast.error(result.serverError);
  }
};

export const isCleanedString = (string: string | Record<string, any> | number): boolean => {
  return !!(!string || typeof string !== 'string' || (string && string.trim().length === 0));
};

export const isServerActionLoading = (status: HookActionStatus): boolean => status === 'executing';
export const hasServerActionFailed = (status: HookActionStatus): boolean => {
  if (!status) return false;
  return status === 'hasErrored';
};