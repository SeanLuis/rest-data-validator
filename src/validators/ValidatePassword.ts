import {IPasswordValidationOptions, IValidationGroupOptions, IValidationResult} from '../interfaces';
import {ContextValidation} from "../context/ContextValidation";
import {shouldValidate} from "../utils/validations/ValidationUtils";

/**
 * The validatePassword function validates a password string based on provided options.
 *
 * It extends string validation by also checking for required character types such as lowercase, uppercase, numeric, and special characters.
 *
 * @function
 * @param {string} value - The password string to validate.
 * @param {IPasswordValidationOptions} options - The validation options for passwords.
 * @param {IValidationGroupOptions} groups - The groups options.
 * @returns {IValidationResult} A ValidationResult object that contains a boolean indicating if the password is valid and an array of error messages.
 */
export const validatePassword = (
  value: string, options: IPasswordValidationOptions = {},
  groups: IValidationGroupOptions = {}
): IValidationResult => {
  const errors: string[] = [];
  const contextGroups = ContextValidation.getInstance().getGroups();

  if (contextGroups.length > 0 && !shouldValidate(contextGroups, groups)) {
    return {isValid: true, errors: []};
  }
  const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const addError = (message: string) => {
    let errorMessage = message;
    if (options.message) {
      errorMessage += ` ${options.message}`;
    }
    errors.push(errorMessage);
  };

  // Length validation
  if (options.minLength !== undefined && value.length < options.minLength) {
    addError(`Password is too short. Minimum length is ${options.minLength}.`);
  }

  if (options.maxLength !== undefined && value.length > options.maxLength) {
    addError(`Password is too long. Maximum length is ${options.maxLength}.`);
  }

  // Custom regex pattern validation
  if (options.regexPattern && !options.regexPattern.test(value)) {
    addError('Password does not match the required pattern.');
  }

  // Character type validations
  if (options.mustContainLowercase && !/[a-z]/.test(value)) {
    addError('Password must contain at least one lowercase letter.');
  }

  if (options.mustContainUppercase && !/[A-Z]/.test(value)) {
    addError('Password must contain at least one uppercase letter.');
  }

  if (options.mustContainNumber && !/\d/.test(value)) {
    addError('Password must contain at least one number.');
  }

  if (options.mustContainSpecialCharacter && !specialCharactersRegex.test(value)) {
    addError('Password must contain at least one special character.');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
};