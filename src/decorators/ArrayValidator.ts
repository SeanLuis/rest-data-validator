import "reflect-metadata";
import { IArrayValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import { IValidationGroupOptions } from "../interfaces";

/**
 * Decorator function for validating an array property.
 * @param options - The validation options for the array.
 * @param groups - The groups options.
 * @returns A decorator function that can be used to apply the validation to a property.
 */
export function Array<T>(options: IArrayValidationOptions<T>, groups: IValidationGroupOptions = {}) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'array', options, groups });
    };
}