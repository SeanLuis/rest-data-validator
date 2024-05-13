import "reflect-metadata";
import { IStringValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import {IValidationGroupOptions} from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function for validating string properties.
 * @param options - The options for string validation.
 * @param groups - The groups options.
 * @returns A decorator function that can be used to apply string validation to a property.
 */
export function String(options: IStringValidationOptions, groups: IValidationGroupOptions = {}) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'string', options, groups });
    };
}