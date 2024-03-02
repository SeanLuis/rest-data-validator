import "reflect-metadata";
import { IArrayValidationOptions } from '../interfaces/IArrayValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

/**
 * Decorator function for validating an array property.
 * @param options - The validation options for the array.
 * @returns A decorator function that can be used to apply the validation to a property.
 */
export function Array<T>(options: IArrayValidationOptions<T>) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'array', options: options }, target, propertyKey);
    };
}
