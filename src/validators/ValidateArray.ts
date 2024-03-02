import { IArrayValidationOptions } from '../interfaces/IArrayValidationOptions';
import { ValidationResult } from '../types/ValidationResult';

/**
 * The validateArray function validates an array based on provided options.
 * It checks if the input is an array, validates its length, uniqueness of its elements, and applies a custom validator if provided.
 *
 * @function
 * @template T - The type of the elements in the array.
 * @param {T[]} values - The array to validate.
 * @param {IArrayValidationOptions<T>} [options={}] - The validation options.
 * @returns {ValidationResult} A ValidationResult object that contains a boolean indicating if the array is valid and an array of error messages.
 */
export const validateArray = <T>(
    values: T[],
    options: IArrayValidationOptions<T> = {}
): ValidationResult => {
    const errors: string[] = [];

    if (!Array.isArray(values)) {
        errors.push('Value provided is not an array.');
        return {
            isValid: false,
            errors: errors
        };
    }

    if (options.minLength !== undefined && values.length < options.minLength) {
        errors.push(`Array is too short. Minimum length is ${options.minLength}.`);
    }

    if (options.maxLength !== undefined && values.length > options.maxLength) {
        errors.push(`Array is too long. Maximum length is ${options.maxLength}.`);
    }

    if (options.unique) {
        const uniqueValues = new Set(values);
        if (uniqueValues.size !== values.length) {
            errors.push(`Array elements are not unique.`);
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