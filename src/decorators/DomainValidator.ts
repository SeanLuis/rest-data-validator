import "reflect-metadata";
import { IDomainValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";

/**
 * Decorator function that applies domain validation to a property.
 * @param options - The options for domain validation.
 * @returns A decorator function.
 */
export function Domain(options: IDomainValidationOptions) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'domain', options });
    };
}