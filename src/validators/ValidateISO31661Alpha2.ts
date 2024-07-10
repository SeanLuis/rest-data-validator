import { IISO31661Alpha2ValidationOptions, IValidationGroupOptions, IValidationResult } from '../interfaces';
import { ContextValidation } from "../context/ContextValidation";
import { shouldValidate } from "../utils/validations/ValidationUtils";
import { validISO31661Alpha2CountriesCodes } from '../utils/common/ISO31661Alpha2Codes';

/**
 * The validateISO31661Alpha2 function validates if a value is a valid ISO 3166-1 alpha-2 code.
 * 
 * @function
 * @param {string} value - The value to validate.
 * @param {IISO31661Alpha2ValidationOptions} options - The validation options.
 * @param {IValidationGroupOptions} groups - The groups options.
 * @returns {IValidationResult} A ValidationResult object that contains a boolean indicating if the value is a valid ISO 3166-1 alpha-2 code and an array of error messages.
 */
export const validateISO31661Alpha2 = (
  value: string, 
  options: IISO31661Alpha2ValidationOptions, 
  groups: IValidationGroupOptions = {}
): IValidationResult => {
    const errors: string[] = [];
    const contextGroups = ContextValidation.getInstance().getGroups();

    if (contextGroups.length > 0 && !shouldValidate(contextGroups, groups)) {
        return { isValid: true, errors: [] };
    }

    if (typeof value !== 'string') {
        errors.push(options.message || `Value is not a valid ISO 3166-1 alpha-2 code.`);
    } else if (!validISO31661Alpha2CountriesCodes.has(value.toUpperCase())) {
        errors.push(options.message || `Value is not a valid ISO 3166-1 alpha-2 code.`);
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};
