import { IAlphaValidationOptions, IValidationGroupOptions, IValidationResult } from '../interfaces';
import { ContextValidation } from "../context/ContextValidation";
import { shouldValidate } from "../utils/validations/ValidationUtils";
import { assertString } from '../utils/common/AssertString';
import { alpha } from '../utils/common/Alpha';

/**
 * The validateIsAlpha function checks if a string contains only letters.
 * It supports locale-based and case-insensitive validation.
 * 
 * @function
 * @param {string} str - The string to validate.
 * @param {IAlphaValidationOptions} options - The validation options.
 * @param {IValidationGroupOptions} groups - The groups options.
 * @returns {IValidationResult} A ValidationResult object that contains a boolean indicating if the string contains only letters and an array of error messages.
 */
export const validateAlpha = (
  str: string,
  options: IAlphaValidationOptions,
  groups: IValidationGroupOptions = {}
): IValidationResult => {
  const errors: string[] = [];
  const contextGroups = ContextValidation.getInstance().getGroups();

  if (contextGroups.length > 0 && !shouldValidate(contextGroups, groups)) {
    return { isValid: true, errors: [] };
  }

  const { locale = 'en-US', ignore } = options;

  assertString(str);
  let sanitizedStr = str;

  if (ignore) {
    if (ignore instanceof RegExp) {
      sanitizedStr = sanitizedStr.replace(ignore, '');
    } else if (typeof ignore === 'string') {
      sanitizedStr = sanitizedStr.replace(new RegExp(`[${ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&')}]`, 'g'), ''); // escape regex for ignore
    } else {
      throw new Error('ignore should be instance of a String or RegExp');
    }
  }

  if (locale in alpha) {
    if (!alpha[locale].test(sanitizedStr)) {
      errors.push(options.message || `String contains invalid characters for locale '${locale}'.`);
    }
  } else {
    throw new Error(`Invalid locale '${locale}'`);
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
};
