import {IRegexValidationOptions, IValidationGroupOptions, IValidationResult} from "../interfaces";
import {shouldValidate} from "../utils/validations/ValidationUtils";
import {ContextValidation} from "../context/ContextValidation";

/**
 * The validateRegex function validates a string based on a provided regular expression pattern.
 *
 * It first trims the value if the `testAgainstTrimmedValue` option is true.
 * If the `allowEmptyString` option is true and the value is an empty string, it returns a valid result.
 *
 * It then tests the value against the provided pattern. If the `invertMatch` option is true, it inverts the result of the test.
 *
 * If the value does not pass the test, it adds an error message to the result.
 *
 * @function
 * @param {string} value - The string to validate.
 * @param {IRegexValidationOptions} options - The validation options.
 * @param {IValidationGroupOptions} groups - The groups options.
 * @returns {IValidationResult} A ValidationResult object that contains a boolean indicating if the value is valid and an array of error messages.
 */
export const validateRegex = (
  value: string,
  options: IRegexValidationOptions,
  groups: IValidationGroupOptions = {}
): IValidationResult => {
  let errors: string[] = [];
  const contextGroups = ContextValidation.getInstance().getGroups();

  if (contextGroups.length > 0 && !shouldValidate(contextGroups, groups)) {
    return {isValid: true, errors: []};
  }

  let isValid = true;

  let testValue = options.testAgainstTrimmedValue ? value.trim() : value;

  if (options.allowEmptyString && testValue === '') {
    return {isValid: true, errors: []};
  }

  const matchResult = options.pattern.test(testValue);
  isValid = options.invertMatch ? !matchResult : matchResult;

  if (!isValid) {
    errors.push(options.message || "Value does not meet the required pattern criteria.");
  }

  return {isValid, errors};
};
