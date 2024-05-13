import {IContextualValidationOptions, IValidationGroupOptions, IValidationResult} from '../interfaces';
import {ContextValidation} from "../context/ContextValidation";
import {shouldValidate} from "../utils/validations/ValidationUtils";

/**
 * The validateContextual function validates data based on provided contextual options.
 *
 * @param {any} value - The data to validate.
 * @param {IContextualValidationOptions} options - The contextual validation options.
 * @param {IValidationGroupOptions} groups - The groups options.
 * @returns {IValidationResult} A IValidationResult object containing the validity and error messages.
 */
export const validateContextual = (
  value: any,
  options: IContextualValidationOptions,
  groups: IValidationGroupOptions = {}
): IValidationResult => {
  const contextGroups = ContextValidation.getInstance().getGroups();

  if (contextGroups.length > 0 && !shouldValidate(contextGroups, groups)) {
    return {isValid: true, errors: []};
  }

  const context = options.getContext();
  const isValid = options.validate(value, context);

  const defaultMessage = `Contextual validation '${options.name}' failed.`;
  const errors = isValid ? [] : [options.message || defaultMessage];

  return {isValid, errors};
};
