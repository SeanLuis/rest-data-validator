import "reflect-metadata";
import { IDateValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";

/**
 * Decorator function for validating date values.
 * @param options - The options for date validation.
 * @returns A decorator function that can be used to apply the validation to a class property.
 */
export function Date(options: IDateValidationOptions) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'date', options });
    };
}