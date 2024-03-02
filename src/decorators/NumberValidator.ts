import "reflect-metadata";
import { INumberValidationOptions } from '../interfaces/INumberValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

/**
 * Decorator function that applies number validation to a property.
 * @param options - The options for number validation.
 * @returns A decorator function.
 */
export function Number(options: INumberValidationOptions) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'number', options: options }, target, propertyKey);
    };
}