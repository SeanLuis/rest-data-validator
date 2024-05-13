import {IEnumValidationOptions, IValidationGroupOptions, IValidationResult} from '../interfaces';
import {ContextValidation} from "../context/ContextValidation";
import {shouldValidate} from "../utils/validations/ValidationUtils";

/**
 * The validateEnum function validates if a value is a member of a specific enumeration.
 * It checks if the input value is included in the provided enumeration.
 * If the value is not a valid enumeration member, it pushes a custom error message or a default error message to the errors array.
 *
 * @function
 * @template T - The type of the enumeration.
 * @param {T} value - The value to validate.
 * @param {IEnumValidationOptions<T>} options - The validation options.
 * @param {IValidationGroupOptions} groups - The groups options.
 * @returns {IValidationResult} A ValidationResult object that contains a boolean indicating if the value is a valid enumeration member and an array of error messages.
 */
export const validateEnum = <T>(
  value: T, options: IEnumValidationOptions<T>,
  groups: IValidationGroupOptions = {}
): IValidationResult => {
  const errors: string[] = [];
  const contextGroups = ContextValidation.getInstance().getGroups();

  if (contextGroups.length > 0 && !shouldValidate(contextGroups, groups)) {
    return {isValid: true, errors: []};
  }

  if (!options.enum.includes(value)) {
    errors.push(options.message || `Value is not a valid enumeration member.`);
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
};