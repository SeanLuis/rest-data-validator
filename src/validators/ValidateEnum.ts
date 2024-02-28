import { EnumValidationOptions } from '../interfaces/IEnumValidationOptions';
import { ValidationResult } from '../types/ValidationResult';

export const validateEnum = <T>(value: T, options: EnumValidationOptions<T>): ValidationResult => {
    const errors: string[] = [];

    if (!options.enum.includes(value)) {
        errors.push(options.message || `Value is not a valid enumeration member.`);
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};