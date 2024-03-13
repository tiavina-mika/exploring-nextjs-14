import { Attributes } from 'parse';

import { filter, isNull } from './utils';

export const setValue = (
  parseObject: Attributes,
  name: string,
  value: any,
): void => {
  const oldValue = parseObject.get(name);
  if (isNull(value)) {
    parseObject.unset(name);
  } else if (oldValue !== value) {
    parseObject.set(name, value);
  }
};

/**
 * . null or undefined values aren't set
 * . a value is set only when it's different
 * @param parseObject
 * @param values
 * @param {Array|Set} names (optional), ensures we only set the right properties
 */
export const setValues = (
  parseObject: Attributes,
  values: Record<string, any>,
  names: Record<string, any>,
): void => {
  let newValues = { ...values };
  if (names) {
    newValues = filter(newValues, names);
  }
  for (const key in newValues) {
    /* eslint-disable-next-line no-prototype-builtins */
    if (!newValues.hasOwnProperty(key)) {
      /* eslint-disable-next-line no-continue */
      continue;
    }
    const value = newValues[key];
    setValue(parseObject, key, value);
  }
};

export const setFormDataValues = (
  parseObj: Parse.Object,
  formDataValues: FormData,
  properties: Set<string>,
): void => {
  formDataValues.forEach((value, key) => {
    const oldValue = parseObj.get(key);

    if (properties.has(key) && oldValue !== value) {
      parseObj.set(key, value);
    } else if (isNull(value)) {
      parseObj.unset(key, value);
    }
  });
};
