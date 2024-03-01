import { ValidationUtils } from '../utils/validations/ValidationUtils';

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
