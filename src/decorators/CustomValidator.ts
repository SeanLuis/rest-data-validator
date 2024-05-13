import "reflect-metadata";
import { ICustomValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import {IValidationGroupOptions} from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function for validating custom values.
 * @param options - The options for custom validation.
 * @param groups - The groups options.
 * @returns A decorator function that can be used to apply the validation to a class property.
 */
export function Custom(options: ICustomValidationOptions, groups: IValidationGroupOptions = {}) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'custom', options, groups });
    };
}