import "reflect-metadata";
import { ICustomValidationOptions } from '../interfaces/ICustomValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

/**
 * Decorator function for validating custom values.
 * @param options - The options for custom validation.
 * @returns A decorator function that can be used to apply the validation to a class property.
 */
export function Custom(options: ICustomValidationOptions) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'custom', options: options }, target, propertyKey);
    };
}