import "reflect-metadata";
import { INumberValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import {IValidationGroupOptions} from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function that applies number validation to a property.
 * @param options - The options for number validation.
 * @param groups - The groups options.
 * @returns A decorator function.
 */
export function Number(options: INumberValidationOptions, groups: IValidationGroupOptions = {}) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'number', options, groups });
    };
}