import "reflect-metadata";
import { IDomainValidationOptions } from '../interfaces/IDomainValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

/**
 * Decorator function that applies domain validation to a property.
 * @param options - The options for domain validation.
 * @returns A decorator function.
 */
export function Domain(options: IDomainValidationOptions) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'domain', options: options }, target, propertyKey);
    };
}