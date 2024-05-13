import "reflect-metadata";
import { IFileValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import {IValidationGroupOptions} from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function that adds file validation metadata to a class property.
 * @param options - The options for file validation.
 * @param groups - The groups options.
 * @returns A decorator function.
 */
export function File(options: IFileValidationOptions, groups: IValidationGroupOptions = {}) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'file', options, groups });
    };
}