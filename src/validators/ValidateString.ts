import { IStringValidationOptions } from '../interfaces/IStringValidationOptions';
import { ValidationResult } from '../types/ValidationResult';

export const validateString = (value: string, options: IStringValidationOptions = {}): ValidationResult => {
    const errors: string[] = [];

    // Check minLength
    if (options.minLength !== undefined && value.length < options.minLength) {
        errors.push(`String is too short. Minimum length is ${options.minLength}.`);
    }

    // Check maxLength
    if (options.maxLength !== undefined && value.length > options.maxLength) {
        errors.push(`String is too long. Maximum length is ${options.maxLength}.`);
    }

    // Check regexPattern
    if (options.regexPattern && !options.regexPattern.test(value)) {
        errors.push(`String does not match the required pattern.`);
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};