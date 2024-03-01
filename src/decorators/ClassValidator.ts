import { ValidationUtils } from '../utils/validations/ValidationUtils';

export function ClassValidator() {
    return function (constructor: { new (...args: any[]): {} }) {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                const validationResult = ValidationUtils.validate(this);
                if (!validationResult.isValid && validationResult.errors) {
                    throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
                }
            }
        };
    };
}
