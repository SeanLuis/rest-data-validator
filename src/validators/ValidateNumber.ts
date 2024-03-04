import { INumberValidationOptions } from '../interfaces/INumberValidationOptions';
import { ValidationResult } from '../types/ValidationResult';

/**
 * The validateNumber function validates a number based on provided options.
 * It checks if the number is within the provided minimum and maximum limits.
 * It checks if the number is an integer if the integerOnly option is true.
 * It checks if the number is positive if the positiveOnly option is true.
 * It checks if the number is negative if the negativeOnly option is true.
 * It checks if the number has more than the provided number of decimal places.
 * It checks if the number is divisible by a certain number.
 * It checks if the number is not equal to any of the numbers in the notEqualTo array.
 * It checks if the number is equal to any of the numbers in the equalTo array.
 *
 * @function
 * @param {number} value - The number to validate.
 * @param {INumberValidationOptions} options - The validation options.
 * @returns {ValidationResult} A ValidationResult object that contains a boolean indicating if the number is valid and an array of error messages.
 */
export const validateNumber = (
    value: number,
    options: INumberValidationOptions = {}
): ValidationResult => {
    const errors: string[] = [];

    const addError = (defaultMessage: string) => {
        errors.push(options.message || defaultMessage);
    };

    if (options.min !== undefined && value < options.min) {
        addError(`The number must be greater than or equal to ${options.min}.`);
    }

    if (options.max !== undefined && value > options.max) {
        addError(`The number must be less than or equal to ${options.max}.`);
    }

    if (options.integerOnly && !Number.isInteger(value)) {
        addError(`The number must be an integer.`);
    }

    if (options.positiveOnly && value <= 0) {
        addError(`The number must be positive.`);
    }

    if (options.negativeOnly && value >= 0) {
        addError(`The number must be negative.`);
    }

    if (options.precision !== undefined && value.toFixed(options.precision).length < value.toString().length) {
        addError(`The number must not have more than ${options.precision} decimal places.`);
    }

    if (options.divisibleBy !== undefined && value % options.divisibleBy !== 0) {
        addError(`The number must be divisible by ${options.divisibleBy}.`);
    }

    if (options.notEqualTo && options.notEqualTo.includes(value)) {
        addError(`The number is not allowed.`);
    }

    if (options.equalTo && !options.equalTo.includes(value)) {
        addError(`The number must equal one of the predefined values.`);
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};