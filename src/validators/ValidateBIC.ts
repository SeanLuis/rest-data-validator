import { IBICValidationOptions, IValidationGroupOptions, IValidationResult } from '../interfaces';
import { ContextValidation } from "../context/ContextValidation";
import { shouldValidate } from '../utils/validations/ValidationUtils';
import { isBICReg } from '../utils/common/BICUtils';
import { validISO31661Alpha2CountriesCodes } from '../utils/common/ISO31661Alpha2Codes';

/**
 * The validateBIC function validates if a value is a valid BIC (Bank Identification Code) or SWIFT code.
 * 
 * @function
 * @param {string} value - The value to validate.
 * @param {IBICValidationOptions} options - The validation options.
 * @param {IValidationGroupOptions} groups - The groups options.
 * @returns {IValidationResult} A ValidationResult object that contains a boolean indicating if the value is a valid BIC and an array of error messages.
 */
export const validateBIC = (
  value: string, 
  options: IBICValidationOptions, 
  groups: IValidationGroupOptions = {}
): IValidationResult => {
    const errors: string[] = [];
    const contextGroups = ContextValidation.getInstance().getGroups();

    if (contextGroups.length > 0 && !shouldValidate(contextGroups, groups)) {
        return { isValid: true, errors: [] };
    }

    if (!isBICReg.test(value)) {
        errors.push(options.message || `Value is not a valid BIC.`);
    } else {
        const countryCode = value.slice(4, 6).toUpperCase();
        if (!validISO31661Alpha2CountriesCodes.has(countryCode) && countryCode !== 'XK') {
            if (options.message) {
                errors.push(options.message);
            } else {
                errors.push(`Value is not a valid BIC: invalid country code.`);
            }
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};
