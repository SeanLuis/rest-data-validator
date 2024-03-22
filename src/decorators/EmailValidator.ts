import "reflect-metadata";
import { IEmailValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";

/**
 * Decorator function for validating email properties.
 * @param options - The options for email validation.
 * @returns A decorator function that can be used to apply email validation to a property.
 */
export function Email(options?: IEmailValidationOptions) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'email', options });
    };
}