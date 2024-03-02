import "reflect-metadata";
import { IEnumValidationOptions } from '../interfaces/IEnumValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

/**
 * Decorator function for validating enum values.
 * @param options - The options for enum validation.
 * @returns A decorator function that can be used to apply enum validation to a property.
 */
export function Enum<T>(options: IEnumValidationOptions<T>) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'enum', options: options }, target, propertyKey);
    };
}