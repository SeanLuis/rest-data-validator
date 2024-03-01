import { ValidationResult } from "../types/ValidationResult";
import { RangeValidationOptions } from "../interfaces/IRangeValidationOptions";
import { isValidDate } from "../utils/date/DateValidation";

export function validateRange<T extends number | Date>(
    value: T,
    options: RangeValidationOptions<T>
): ValidationResult {
    const errors: string[] = [];

    // Ejemplo de implementación para un valor numérico
    if (typeof value === 'number' && typeof options.min === 'number') {
        if (options.inclusive ? value < options.min : value <= options.min) {
            errors.push(options.errorMessage?.min || `Value must be greater than ${(options.inclusive ? "or equal to " : "")}${options.min}.`);
        }
    }

    // Validación para `max`
    if (typeof value === 'number' && typeof options.max === 'number') {
        if (options.inclusive ? value > options.max : value >= options.max) {
            errors.push(options.errorMessage?.max || `Value must be less than ${(options.inclusive ? "or equal to " : "")}${options.max}.`);
        }
    }

    // Validación para `step` (solo aplicable a números)
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

    // Custom Validator
    if (options.customValidator && !options.customValidator(value)) {
        errors.push(options.errorMessage?.customValidator || "Custom validation failed.");
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}
