// Decoradores como `Required.ts`
import { ValidationMetadata } from '../utils/validations/ValidationMetadata';

export function Required() {
    return function (target: Object, propertyKey: string) {
        ValidationMetadata.setForProperty(target, propertyKey, {
            required: true
        });
    };
}
