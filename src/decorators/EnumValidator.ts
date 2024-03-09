import "reflect-metadata";
import { IEnumValidationOptions } from '../interfaces/IEnumValidationOptions';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";

/**
 * Decorator function for validating enum values.
 * @param options - The options for enum validation.
 * @returns A decorator function that can be used to apply enum validation to a property.
 */
export function Enum<T>(options: IEnumValidationOptions<T>) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'enum', options });
    };
}