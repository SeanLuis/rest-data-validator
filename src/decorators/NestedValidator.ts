import "reflect-metadata";
import { INestedValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";

/**
 * Decorator function for validating nested objects or arrays of objects.
 * @param options - The validation options for the nested structure.
 * @returns A decorator function that can be used to apply the validation to a property.
 */
export function Nested<T>(options: INestedValidationOptions<T>) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'nested', options });
    };
}
