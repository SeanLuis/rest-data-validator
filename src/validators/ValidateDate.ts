import { IDateValidationOptions, IValidationResult } from '../interfaces';

/**
 * The validateDate function validates a date string based on provided options.
 * It checks if the input is a valid date, and if it is before or after certain dates as specified in the options.
 *
 * @function
 * @param {string} value - The date string to validate.
 * @param {IDateValidationOptions} [options={}] - The validation options.
 * @returns {IValidationResult} A IValidationResult object that contains a boolean indicating if the date is valid and an array of error messages.
 */
export const validateDate = (
    value: string,
    options: IDateValidationOptions = {}
): IValidationResult => {
    const errors: string[] = [];
    const date = new Date(value);

    const baseErrorMessage = 'Invalid date.';
    if (!value || typeof value !== 'string' || isNaN(date.getTime())) {
        errors.push(options.message || baseErrorMessage);
    } else {
        if (options.before && date >= options.before) {
            const beforeMessage = `Date should be before ${options.before.toISOString()}.`;
            errors.push(options.message || beforeMessage);
        }

        if (options.after && date <= options.after) {
            const afterMessage = `Date should be after ${options.after.toISOString()}.`;
            errors.push(options.message || afterMessage);
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};