import { RegexValidationOptions } from '../interfaces/IRegexValidationOptions';
import { ValidationResult } from '../types/ValidationResult';

export const validateRegex = (
    value: string,
    options: RegexValidationOptions
): ValidationResult => {
    const errors: string[] = [];
    let isValid = true;

    const testValue = options.testAgainstTrimmedValue ? value.trim() : value;

    if (options.allowEmptyString && testValue === '') {
        isValid = true;
    } else {
        const matchResult = options.pattern.test(testValue);
        isValid = options.invertMatch ? !matchResult : matchResult;

        if (!isValid) {
            errors.push(options.message || `Value does not meet the required pattern criteria.`);
        }
    }

    return {
        isValid: isValid,
        errors: errors
    };
};
