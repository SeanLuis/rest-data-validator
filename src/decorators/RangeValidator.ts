import "reflect-metadata";
import { IRangeValidationOptions } from '../interfaces/IRangeValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

/**
 * Decorator function for applying range validation to a property.
 * @param options - The range validation options.
 * @returns A decorator function.
 */
export function Range<T>(options: IRangeValidationOptions<T>) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'range', options: options }, target, propertyKey);
    };
}