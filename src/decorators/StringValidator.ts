import "reflect-metadata";
import { IStringValidationOptions } from '../interfaces/IStringValidationOptions';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";

/**
 * Decorator function for validating string properties.
 * @param options - The options for string validation.
 * @returns A decorator function that can be used to apply string validation to a property.
 */
export function String(options: IStringValidationOptions) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'string', options });
    };
}