import "reflect-metadata";
import { IISO31661Alpha2ValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import { IValidationGroupOptions } from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function for validating ISO 3166-1 alpha-2 codes.
 * @param options - The options for ISO 3166-1 alpha-2 validation.
 * @param groups - The groups options.
 * @returns A decorator function that can be used to apply ISO 3166-1 alpha-2 validation to a property.
 */
export function ISO31661Alpha2(options: IISO31661Alpha2ValidationOptions, groups: IValidationGroupOptions = {}) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'ISO31661Alpha2', options, groups });
    };
}
