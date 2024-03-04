import { ValidationResult } from "../types/ValidationResult";
import { IRangeValidationOptions } from "../interfaces/IRangeValidationOptions";
import { isValidDate } from "../utils/date/DateValidation";

/**
 * The validateRange function validates a range of values based on provided options.
 * It can handle both numbers and dates.
 * 
 * For Date values:
 * - It checks if the value is within the provided minimum and maximum dates.
 * 
 * For number values:
 * - It checks if the value is within the provided minimum and maximum numbers. The check can be inclusive or exclusive based on the `inclusive` option.
 * - If the `step` option is provided, it checks if the value is a multiple of the step.
 * 
 * For string values:
 * - If the `dateFormat` option is provided, it checks if the value is a valid date.
 * 
 * It also supports a custom validator function provided in the options.
 * 
 * @function
 * @param {T} value - The value to validate. T can be a number or a Date.
 * @param {IRangeValidationOptions<T>} options - The validation options.
 * @returns {ValidationResult} A ValidationResult object that contains a boolean indicating if the value is valid and an array of error messages.
 */
export function validateRange<T extends number | Date | string>(
    value: T,
    options: IRangeValidationOptions<T>
): ValidationResult {
    const errors: string[] = [];

    const addError = (specificErrorMessage: string | undefined, defaultMessage: string) => {
        if (specificErrorMessage && options.message) {
            errors.push(`${specificErrorMessage} ${options.message}`);
        } else {
            errors.push(specificErrorMessage || options.message || defaultMessage);
        }
    };

    if (value instanceof Date) {
        if (options.min instanceof Date && value < options.min) {
            addError(options.errorMessage?.min, `Validation failed: Value must be greater than or equal to ${options.min.toISOString()}.`);
        }
        if (options.max instanceof Date && value > options.max) {
            addError(options.errorMessage?.max, `Validation failed: Value must be less than or equal to ${options.max.toISOString()}.`);
        }
    } else if (typeof value === 'number') {
        if (typeof options.min === 'number' && (options.inclusive ? value < options.min : value <= options.min)) {
            addError(options.errorMessage?.min, `Value must be greater than ${(options.inclusive ? "or equal to " : "")}${options.min}.`);
        }
        if (typeof options.max === 'number' && (options.inclusive ? value > options.max : value >= options.max)) {
            addError(options.errorMessage?.max, `Value must be less than ${(options.inclusive ? "or equal to " : "")}${options.max}.`);
        }
        if (options.step !== undefined && (value / options.step) % 1 !== 0) {
            addError(options.errorMessage?.step, `Value must be a multiple of ${options.step}.`);
        }
    } else if (typeof value === 'string' && options.dateFormat && !isValidDate(value)) {
        addError(options.errorMessage?.dateFormat, `Date does not match the required format: ${options.dateFormat}.`);
    }

    if (options.customValidator && !options.customValidator(value)) {
        addError(options.errorMessage?.customValidator, "Custom validation failed.");
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}
