import "reflect-metadata";
import { IContainsValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import { IValidationGroupOptions } from "../interfaces";

/**
 * Decorator function for validating if a string contains a specific seed.
 * @param options - The options for contains validation.
 * @param groups - The groups options.
 * @returns A decorator function that can be used to apply contains validation to a property.
 */
export function Contains(options: IContainsValidationOptions, groups: IValidationGroupOptions = {}) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'contains', options, groups });
    };
}
