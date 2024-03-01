import { IArrayValidationOptions } from '../interfaces/IArrayValidationOptions';
import { ValidationResult } from '../types/ValidationResult';
export const validateArray = <T>(
    values: T[],
    options: IArrayValidationOptions<T> = {}
): ValidationResult => {
    const errors: string[] = [];

    // First check: make sure 'values' is actually an array
    if (!Array.isArray(values)) {
        errors.push('Value provided is not an array.');
        return {
            isValid: false,
            errors: errors
        };
    }

    // Check minLength
    if (options.minLength !== undefined && values.length < options.minLength) {
        errors.push(`Array is too short. Minimum length is ${options.minLength}.`);
    }

    // Check maxLength
    if (options.maxLength !== undefined && values.length > options.maxLength) {
        errors.push(`Array is too long. Maximum length is ${options.maxLength}.`);
    }

    // Check unique
    if (options.unique) {
        const uniqueValues = new Set(values);
        if (uniqueValues.size !== values.length) {
            errors.push(`Array elements are not unique.`);
        }
    }

    // Check with custom validator if provided
    if (options.validator) {
        values.forEach((value, index) => {
            // We check if options.validator is defined here to satisfy TypeScript's strict null checks
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
