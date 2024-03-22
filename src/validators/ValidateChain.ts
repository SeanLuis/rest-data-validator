import { IChainValidationOptions } from "../interfaces";
import { ValidationChain } from "../types/ValidationChain";

/**
 * Validates a value using a chain of validators.
 *
 * @param value - The value to be validated.
 * @param options - The options for the validation chain.
 * @returns An object representing the validation result.
 */
export const validateChain: ValidationChain = (value: any, options: IChainValidationOptions) => {
  for (let validatorWithOptions of options.validators) {
    const result = validatorWithOptions.validator(value, validatorWithOptions.options);
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true, errors: [] };
};