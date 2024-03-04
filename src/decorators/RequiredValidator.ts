// Decoradores como `Required.ts`
import { ValidationMetadata } from '../utils/validations/ValidationMetadata';

/**
 * Decorator that marks a property as required.
 * @returns A function that sets the required flag for the property.
 */
export function Required() {
    return function (target: Object, propertyKey: string) {
        let _value: any;
        const originalDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

        Object.defineProperty(target, propertyKey, {
            get: function() {
                if (_value === undefined) {
                    throw new Error(`Validation failed: ${propertyKey} is required.`);
                }
                return _value;
            },
            set: function(value) {
                _value = value;
            }
        });

        ValidationMetadata.setForProperty(target, propertyKey, {
            required: true
        });
    };
}
