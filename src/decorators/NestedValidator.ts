import "reflect-metadata";
import { INestedValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import {IValidationGroupOptions} from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function for validating nested objects or arrays of objects.
 * @param options - The validation options for the nested structure.
 * @param groups - The groups options.
 * @returns A decorator function that can be used to apply the validation to a property.
 */
export function Nested<T>(options: INestedValidationOptions<T>, groups: IValidationGroupOptions = {}) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'nested', options, groups });
    };
}
