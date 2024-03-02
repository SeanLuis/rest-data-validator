import { IEnumValidationOptions } from '../interfaces/IEnumValidationOptions';
import { ValidationResult } from '../types/ValidationResult';

/**
 * The validateEnum function validates if a value is a member of a specific enumeration.
 * It checks if the input value is included in the provided enumeration.
 * If the value is not a valid enumeration member, it pushes a custom error message or a default error message to the errors array.
 *
 * @function
 * @template T - The type of the enumeration.
 * @param {T} value - The value to validate.
 * @param {IEnumValidationOptions<T>} options - The validation options.
 * @returns {ValidationResult} A ValidationResult object that contains a boolean indicating if the value is a valid enumeration member and an array of error messages.
 */
export const validateEnum = <T>(value: T, options: IEnumValidationOptions<T>): ValidationResult => {
    const errors: string[] = [];

    if (!options.enum.includes(value)) {
        errors.push(options.message || `Value is not a valid enumeration member.`);
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};