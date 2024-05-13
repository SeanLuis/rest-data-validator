import {IEmailValidationOptions, IValidationGroupOptions, IValidationResult} from '../interfaces';
import {ContextValidation} from "../context/ContextValidation";
import {shouldValidate} from "../utils/validations/ValidationUtils";

/**
 * The validateEmail function validates an email based on provided options or a default pattern.
 *
 * It checks if the email matches the provided regular expression pattern or a default one.
 *
 * @function
 * @param {string} email - The email to validate.
 * @param {IEmailValidationOptions} options - The validation options including a custom regex pattern and a custom error message.
 * @param {IValidationGroupOptions} groups - The groups options.
 * @returns {IValidationResult} A ValidationResult object that contains a boolean indicating if the email is valid and an array of error messages.
 */
export const validateEmail = (
  email: string,
  options: IEmailValidationOptions = {},
  groups: IValidationGroupOptions = {}
): IValidationResult => {
  const errors: string[] = [];
  const contextGroups = ContextValidation.getInstance().getGroups();

  if (contextGroups.length > 0 && !shouldValidate(contextGroups, groups)) {
    return {isValid: true, errors: []};
  }

  // Define the default email regex pattern.
  let regexPattern = /^[a-zA-Z0-9_'^&/+-]{1,64}(?:\.[a-zA-Z0-9_'^&/+-]{1,64})*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,24}$/;

  // Validate and use the custom regex pattern if provided and valid; otherwise, use the default.
  try {
    if (options.regexPattern) {
      new RegExp(options.regexPattern);
      regexPattern = options.regexPattern;
    }
  } catch (e) {
    console.warn('Provided regex pattern is invalid. Using the default pattern.');
  }
  let regRes = regexPattern.test(email)
  if (!regRes) {
    let errorMessage = 'Email does not match the required pattern.';
    if (options.message) {
      errorMessage += ` ${options.message}`;
    }
    errors.push(errorMessage);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
