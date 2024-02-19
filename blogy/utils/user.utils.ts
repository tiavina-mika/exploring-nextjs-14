import { isCleanedString } from "./utils";

export const capitalizeFirstLetter = (string: string): string => {
  if (isCleanedString(string)) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};