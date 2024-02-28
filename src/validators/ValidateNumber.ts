import { INumberValidationOptions } from '../interfaces/INumberValidationOptions';
import { ValidationResult } from '../types/ValidationResult';

export const validateNumber = (
    value: number,
    options: INumberValidationOptions = {}
): ValidationResult => {
    const errors: string[] = [];

    // Validaciones basadas en las opciones proporcionadas
    if (options.min !== undefined && value < options.min) {
        errors.push(`The number must be greater than or equal to ${options.min}.`);
    }

    if (options.max !== undefined && value > options.max) {
        errors.push(`The number must be less than or equal to ${options.max}.`);
    }

    if (options.integerOnly && !Number.isInteger(value)) {
        errors.push(`The number must be an integer.`);
    }

    if (options.positiveOnly && value <= 0) {
        errors.push(`The number must be positive.`);
    }

    if (options.negativeOnly && value >= 0) {
        errors.push(`The number must be negative.`);
    }

    if (options.precision !== undefined && value.toFixed(options.precision).length < value.toString().length) {
        errors.push(`The number must not have more than ${options.precision} decimal places.`);
    }

    if (options.divisibleBy !== undefined && value % options.divisibleBy !== 0) {
        errors.push(`The number must be divisible by ${options.divisibleBy}.`);
    }

    if (options.notEqualTo && options.notEqualTo.includes(value)) {
        errors.push(`The number is not allowed.`);
    }

    if (options.equalTo && !options.equalTo.includes(value)) {
        errors.push(`The number must equal one of the predefined values.`);
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};
