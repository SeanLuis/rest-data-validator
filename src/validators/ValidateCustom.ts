import { ICustomValidationOptions } from '../interfaces/ICustomValidationOptions';
import { ValidationResult } from '../types/ValidationResult';

/**
 * The validateCustom function validates custom data based on provided options.
 *
 * @function
 * @param {any} value - The custom data to validate.
 * @param {ICustomValidationOptions} [options={}] - The validation options.
 * @returns {ValidationResult} A ValidationResult object that contains a boolean indicating if the data is valid and an array of error messages.
 */
export const validateCustom = (
    value: any,
    options: ICustomValidationOptions
): ValidationResult => {
    // Use the validate function from the options to validate the value
    const isValid = options.validate(value);
    const errors = isValid ? [] : [`Custom validation '${options.name}' failed.`];

    // Return the validation result
    return { isValid, errors };
};