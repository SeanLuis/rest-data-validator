import {IChainValidationOptions, IValidationGroupOptions, IValidationResult} from "../interfaces";
import {ValidationChain} from "../types/ValidationChain";
import {ContextValidation} from "../context/ContextValidation";
import {shouldValidate} from "../utils/validations/ValidationUtils";

/**
 * Validates a value using a chain of validators.
 *
 * @param value - The value to be validated.
 * @param options - The options for the validation chain.
 * @param {IValidationGroupOptions} groups - The groups options. options.
 * @returns An object representing the validation result.
 */
export const validateChain: ValidationChain = (
  value: any,
  options: IChainValidationOptions,
  groups: IValidationGroupOptions = {}
): IValidationResult => {
  const contextGroups = ContextValidation.getInstance().getGroups();

  if (contextGroups.length > 0 && !shouldValidate(contextGroups, groups)) {
    return {isValid: true, errors: []};
  }

  for (let validatorWithOptions of options.validators) {
    const result = validatorWithOptions.validator(value, validatorWithOptions.options);
    if (!result.isValid) {
      return result;
    }
  }
  return {isValid: true, errors: []};
};