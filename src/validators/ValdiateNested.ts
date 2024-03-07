import { INestedValidationOptions } from '../interfaces/INestedValidationOptions';
import { ValidationResult } from '../types/ValidationResult';

/**
 * Validates an object's nested properties based on provided validation options.
 *
 * @template T - The type of the elements in the nested properties.
 * @param {Record<string, any>} value - The object containing nested properties to validate.
 * @param {INestedValidationOptions<T>} options - The nested validation options.
 * @returns {ValidationResult} A ValidationResult object with the validation result.
 */
export const validateNested = <T>(
    value: Record<string, any>,
    options: INestedValidationOptions<T>
): ValidationResult => {
    const errors: string[] = [];

    if (typeof value !== 'object' || value == null) {
        errors.push(options.message || 'Value provided is not an object.');
    } else {
        Object.keys(value).forEach((key) => {
            const nestedValue = value[key];

            if (options.each && Array.isArray(nestedValue)) {
                nestedValue.forEach((element: T, index: number) => {
                    const elementValidationResult = options.validator.validate(element, options.validationOptions);
                    if (!elementValidationResult.isValid) {
                        const elementErrors = elementValidationResult.errors?.join(', ') || 'Invalid value';
                        errors.push(`Element at index ${index} in array at property '${key}' is invalid: ${elementErrors}`);
                    }
                });
            } else {
                const nestedValidationResult = options.validator.validate(nestedValue as T, options.validationOptions);
                if (!nestedValidationResult.isValid) {
                    const propertyErrors = nestedValidationResult.errors?.join(', ') || 'Invalid value';
                    errors.push(`Validation failed for nested property '${key}': ${propertyErrors}`);
                }
            }
        });
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};
