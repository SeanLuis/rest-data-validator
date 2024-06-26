import "reflect-metadata";
import { IRangeValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import {IValidationGroupOptions} from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function for applying range validation to a property.
 * @param options - The range validation options.
 * @param groups - The groups options.
 * @returns A decorator function.
 */
export function Range<T>(options: IRangeValidationOptions<T>, groups: IValidationGroupOptions = {}) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'range', options, groups });
    };
}