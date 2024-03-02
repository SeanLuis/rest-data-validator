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
export function validateRange<T extends number | Date>(
    value: T,
    options: IRangeValidationOptions<T>
): ValidationResult {
    const errors: string[] = [];

    if (value instanceof Date) {
        if (options.min instanceof Date && value < options.min) {
            errors.push(`Validation failed: Value must be greater than or equal to ${options.min.toISOString()}.`);
        }
        if (options.max instanceof Date && value > options.max) {
            errors.push(`Validation failed: Value must be less than or equal to ${options.max.toISOString()}.`            );
        }
    }

    if (typeof value === 'number' && typeof options.min === 'number') {
        if (options.inclusive ? value < options.min : value <= options.min) {
            errors.push(options.errorMessage?.min || `Value must be greater than ${(options.inclusive ? "or equal to " : "")}${options.min}.`);
        }
    }

    if (typeof value === 'number' && typeof options.max === 'number') {
        if (options.inclusive ? value > options.max : value >= options.max) {
            errors.push(options.errorMessage?.max || `Value must be less than ${(options.inclusive ? "or equal to " : "")}${options.max}.`);
        }
    }

    if (options.step !== undefined && typeof value === 'number') {
        const stepValidation = (value / options.step) % 1 === 0;
        if (!stepValidation) {
            errors.push(options.errorMessage?.step || `Value must be a multiple of ${options.step}.`);
        }
    }

    if (typeof value === 'string' && options.dateFormat) {
        if (!isValidDate(value)) {
            errors.push(options.errorMessage?.dateFormat || `Date does not match the required format: ${options.dateFormat}.`);
        }
    }

    if (options.customValidator && !options.customValidator(value)) {
        errors.push(options.errorMessage?.customValidator || "Custom validation failed.");
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}
