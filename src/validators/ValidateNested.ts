import { INestedValidationOptions } from '../interfaces/INestedValidationOptions';
import { ValidationResult } from '../types/ValidationResult';

/**
 * Recursively validates an object's nested properties based on provided validation options.
 *
 * @template T - The expected type of the elements in the nested properties.
 * @param {Record<string, any>} value - The object containing properties to validate.
 * @param {INestedValidationOptions<T>} options - The nested validation options.
 * @returns {ValidationResult} An object containing the validation result.
 */
export const validateNested = <T>(
    value: any,
    options: INestedValidationOptions<T>
): ValidationResult => {
    const errors: string[] = [];

    if (Array.isArray(value)) {
        const validationResult = options.validator.validate(value, options.validationOptions);
        if (!validationResult.isValid && validationResult.errors) {
            validationResult.errors.forEach((error) => {
                errors.push(`Validation failed for array: ${error}`);
            });
        }
        if (options.each) {
            value.forEach((element, index) => {
                const validationResult = options.validator.validate(element, options.validationOptions);
                if (!validationResult.isValid && validationResult.errors) {
                    validationResult.errors.forEach((error) => {
                        errors.push(`Validation failed for index ${index}: ${error}`);
                    });
                }
            });
        }
    } else if (typeof value !== 'object' || value == null) {
        errors.push(options.message || 'Value provided is not an object.');
    } else {
        Object.keys(value).forEach((key) => {
            const nestedValue = value[key];

            const validationResult = options.validator.validate(nestedValue, options.validationOptions);
            if (!validationResult.isValid) {
                errors.push(`Validation failed for property '${key}': ${validationResult.errors?.join(', ')}`);
            }

            if (options.each) {
                if (Array.isArray(nestedValue)) {
                    nestedValue.forEach((element, index) => {
                        const validationResult = options.validator.validate(element, options.validationOptions);
                        if (!validationResult.isValid && validationResult.errors) {
                            validationResult.errors.forEach((error) => {
                                errors.push(`Validation failed for property '${key}' at index ${index}: ${error}`);
                            });
                        }
                    });
                } else if (typeof nestedValue === 'object') {
                    const nestedObjectResult = validateNested(nestedValue, options);
                    if (!nestedObjectResult.isValid && nestedObjectResult.errors) {
                        nestedObjectResult.errors.forEach(error => {
                            errors.push(`Nested validation failed for '${key}': ${error}`);
                        });
                    }
                }
            }
        });
    }

    return { isValid: errors.length === 0, errors };
};