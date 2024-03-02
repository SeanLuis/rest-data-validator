import "reflect-metadata";
import { IStringValidationOptions } from '../interfaces/IStringValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

/**
 * Decorator function for validating string properties.
 * @param options - The options for string validation.
 * @returns A decorator function that can be used to apply string validation to a property.
 */
export function String(options: IStringValidationOptions) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'string', options: options }, target, propertyKey);
    };
}