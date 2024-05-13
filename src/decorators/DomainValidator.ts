import "reflect-metadata";
import { IDomainValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import {IValidationGroupOptions} from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function that applies domain validation to a property.
 * @param options - The options for domain validation.
 * @param groups - The groups options.
 * @returns A decorator function.
 */
export function Domain(options: IDomainValidationOptions, groups: IValidationGroupOptions = {}) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'domain', options, groups });
    };
}