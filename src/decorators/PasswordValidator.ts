import "reflect-metadata";
import { IPasswordValidationOptions } from '../interfaces/IPasswordValidationOptions';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";

/**
 * Decorator function for validating password properties.
 * @param options - The options for password validation.
 * @returns A decorator function that can be used to apply password validation to a property.
 */
export function Password(options: IPasswordValidationOptions) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'password', options });
    };
}