import "reflect-metadata";
import { INumberValidationOptions } from '../interfaces/INumberValidationOptions';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";

/**
 * Decorator function that applies number validation to a property.
 * @param options - The options for number validation.
 * @returns A decorator function.
 */
export function Number(options: INumberValidationOptions) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'number', options });
    };
}