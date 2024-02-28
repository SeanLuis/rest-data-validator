import { IDateValidationOptions } from '../interfaces/IDateValidationOptions';
import { ValidationResult } from '../types/ValidationResult';

export const validateDate = (
    value: string,
    options: IDateValidationOptions = {}
): ValidationResult => {
    const errors: string[] = [];
    const date = new Date(value);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        errors.push(`Invalid date.`);
    } else {
        // Check 'before' condition
        if (options.before && date >= options.before) {
            errors.push(`Date should be before ${options.before.toISOString()}.`);
        }

        // Check 'after' condition
        if (options.after && date <= options.after) {
            errors.push(`Date should be after ${options.after.toISOString()}.`);
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};