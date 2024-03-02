import { ValidationUtils } from '../utils/validations/ValidationUtils';

/**
 * Decorator that adds validation functionality to a class constructor.
 * Validates the instance of the class using the `ValidationUtils.validate` method.
 * If validation fails, an error is thrown with the validation errors.
 * @param constructor The class constructor to be decorated.
 * @returns The decorated class constructor.
 */
export function ClassValidator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);
            const validationResult = ValidationUtils.validate(this);
            if (!validationResult.isValid && validationResult.errors) {
                throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
            }
        }
    } as T;
}
