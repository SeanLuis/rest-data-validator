import { IArrayValidationOptions, IValidationResult } from '../interfaces';

/**
 * The validateArray function validates an array based on provided options.
 * It checks if the input is an array, validates its length, uniqueness of its elements, and applies a custom validator if provided.
 *
 * @function
 * @template T - The type of the elements in the array.
 * @param {T[]} values - The array to validate.
 * @param {IArrayValidationOptions<T>} [options={}] - The validation options.
 * @returns {IValidationResult} A IValidationResult object that contains a boolean indicating if the array is valid and an array of error messages.
 */
export const validateArray = <T>(
    values: T[],
    options: IArrayValidationOptions<T> = {}
): IValidationResult => {
    const errors: string[] = [];

    if (!Array.isArray(values)) {
        const defaultMessage = 'Value provided is not an array.';
        errors.push(options.message || defaultMessage);
        return {
            isValid: false,
            errors: errors
        };
    }

    if (options.minLength !== undefined && values.length < options.minLength) {
        const defaultMessage = `Array is too short. Minimum length is ${options.minLength}.`;
        errors.push(options.message || defaultMessage);
    }

    if (options.maxLength !== undefined && values.length > options.maxLength) {
        const defaultMessage = `Array is too long. Maximum length is ${options.maxLength}.`;
        errors.push(options.message || defaultMessage);
    }

    if (options.unique) {
        const uniqueValues = new Set(values);
        if (uniqueValues.size !== values.length) {
            const defaultMessage = `Array elements are not unique.`;
            errors.push(options.message || defaultMessage);
        }
    }

    if (options.validator) {
        values.forEach((value, index) => {
            const result = options.validator ? options.validator(value) : null;
            if (result && !result.isValid) {
                if (result.errors) {
                    errors.push(`Element at index ${index} is invalid: ${result.errors.join(', ')}`);
                }
            }
        });
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};