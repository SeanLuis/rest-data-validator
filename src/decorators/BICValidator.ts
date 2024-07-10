import "reflect-metadata";
import { IBICValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import { IValidationGroupOptions } from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function for validating BIC codes.
 * @param options - The options for BIC validation.
 * @param groups - The groups options.
 * @returns A decorator function that can be used to apply BIC validation to a property.
 */
export function BIC(options: IBICValidationOptions, groups: IValidationGroupOptions = {}) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'BIC', options, groups });
    };
}
