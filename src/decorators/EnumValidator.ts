import "reflect-metadata";
import { IEnumValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import {IValidationGroupOptions} from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function for validating enum values.
 * @param options - The options for enum validation.
 * @param groups - The groups options.
 * @returns A decorator function that can be used to apply enum validation to a property.
 */
export function Enum<T>(options: IEnumValidationOptions<T>, groups: IValidationGroupOptions = {}) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'enum', options, groups });
    };
}