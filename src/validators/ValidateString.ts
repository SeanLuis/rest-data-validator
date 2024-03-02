import { IStringValidationOptions } from '../interfaces/IStringValidationOptions';
import { ValidationResult } from '../types/ValidationResult';

/**
 * The validateString function validates a string based on provided options.
 * 
 * It checks if the length of the string is within the provided minimum and maximum lengths.
 * It checks if the string matches the provided regular expression pattern.
 * 
 * @function
 * @param {string} value - The string to validate.
 * @param {IStringValidationOptions} options - The validation options.
 * @returns {ValidationResult} A ValidationResult object that contains a boolean indicating if the string is valid and an array of error messages.
 */
export const validateString = (value: string, options: IStringValidationOptions = {}): ValidationResult => {
    const errors: string[] = [];

    if (options.minLength !== undefined && value.length < options.minLength) {
        errors.push(`String is too short. Minimum length is ${options.minLength}.`);
    }

    if (options.maxLength !== undefined && value.length > options.maxLength) {
        errors.push(`String is too long. Maximum length is ${options.maxLength}.`);
    }

    if (options.regexPattern && !options.regexPattern.test(value)) {
        errors.push(`String does not match the required pattern.`);
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};