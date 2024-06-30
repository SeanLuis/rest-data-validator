import { IContainsValidationOptions, IValidationGroupOptions, IValidationResult } from '../interfaces';
import { ContextValidation } from "../context/ContextValidation";
import { shouldValidate } from "../utils/validations/ValidationUtils";

/**
 * The validateContains function checks if a string contains a specific seed a minimum number of times.
 * It supports case-insensitive comparison based on the provided options.
 * 
 * @function
 * @param {string} str - The string to validate.
 * @param {IContainsValidationOptions} options - The validation options.
 * @param {IValidationGroupOptions} groups - The groups options.
 * @returns {IValidationResult} A ValidationResult object that contains a boolean indicating if the string contains the seed the required number of times and an array of error messages.
 */
export const validateContains = (
  str: string, 
  options: IContainsValidationOptions,
  groups: IValidationGroupOptions = {}
): IValidationResult => {
  const errors: string[] = [];
  const contextGroups = ContextValidation.getInstance().getGroups();
  
  if (contextGroups.length > 0 && !shouldValidate(contextGroups, groups)) {
    return { isValid: true, errors: [] };
  }

  const { seed, ignoreCase = false, minOccurrences = 1 } = options;
  const normalizedStr = ignoreCase ? str.toLowerCase() : str;
  const normalizedSeed = ignoreCase ? seed.toLowerCase() : seed;
  const occurrences = (normalizedStr.match(new RegExp(normalizedSeed, 'g')) || []).length;

  if (occurrences < minOccurrences) {
    errors.push(options.message || `String does not contain the seed '${seed}' at least ${minOccurrences} times.`);
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
};
