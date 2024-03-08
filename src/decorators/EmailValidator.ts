import "reflect-metadata";
import { IEmailValidationOptions } from '../interfaces/IEmailValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

/**
 * Decorator function for validating email properties.
 * @param options - The options for email validation.
 * @returns A decorator function that can be used to apply email validation to a property.
 */
export function Email(options: IEmailValidationOptions) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'string', options: options }, target, propertyKey);
    };
}