import "reflect-metadata";
import { IFileValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";

/**
 * Decorator function that adds file validation metadata to a class property.
 * @param options - The options for file validation.
 * @returns A decorator function.
 */
export function File(options: IFileValidationOptions) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'file', options });
    };
}