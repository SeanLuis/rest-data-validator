import { IDateValidationOptions } from '../interfaces/IDateValidationOptions';
import { ValidationResult } from '../types/ValidationResult';

/**
 * The validateDate function validates a date string based on provided options.
 * It checks if the input is a valid date, and if it is before or after certain dates as specified in the options.
 *
 * @function
 * @param {string} value - The date string to validate.
 * @param {IDateValidationOptions} [options={}] - The validation options.
 * @returns {ValidationResult} A ValidationResult object that contains a boolean indicating if the date is valid and an array of error messages.
 */
export const validateDate = (
    value: string,
    options: IDateValidationOptions = {}
): ValidationResult => {
    const errors: string[] = [];
    const date = new Date(value);

    if (typeof value !== 'string') {
        errors.push('Invalid date.');
    } else if (isNaN(date.getTime())) {
        errors.push('Invalid date.');
    } else {
        if (options.before && date >= options.before) {
            errors.push(`Date should be before ${options.before.toISOString()}.`);
        }

        if (options.after && date <= options.after) {
            errors.push(`Date should be after ${options.after.toISOString()}.`);
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};