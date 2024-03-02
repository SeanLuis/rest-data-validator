import "reflect-metadata";
import { IDateValidationOptions } from '../interfaces/IDateValidationOptions';
import {validateMetadataKey} from "../utils/validations/MetadataKeys";

/**
 * Decorator function for validating date values.
 * @param options - The options for date validation.
 * @returns A decorator function that can be used to apply the validation to a class property.
 */
export function Date(options: IDateValidationOptions) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'date', options: options }, target, propertyKey);
    };
}