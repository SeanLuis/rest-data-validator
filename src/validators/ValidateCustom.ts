import { ICustomValidationOptions, IValidationResult } from '../interfaces';

/**
 * The validateCustom function validates custom data based on provided options.
 *
 * @function
 * @param {any} value - The custom data to validate.
 * @param {ICustomValidationOptions} [options={}] - The validation options.
 * @returns {IValidationResult} A IValidationResult object that contains a boolean indicating if the data is valid and an array of error messages.
 */
export const validateCustom = (
    value: any,
    options: ICustomValidationOptions
): IValidationResult => {
    // Use the validate function from the options to validate the value
    const isValid = options.validate(value);

    const defaultMessage = `Custom validation '${options.name}' failed.`;
    const errors = isValid ? [] : [options.message || defaultMessage];

    // Return the validation result
    return { isValid, errors };
};