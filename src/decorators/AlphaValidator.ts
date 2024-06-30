import "reflect-metadata";
import { IAlphaValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import { IValidationGroupOptions } from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function for validating if a string contains only letters.
 * @param options - The options for alpha validation.
 * @param groups - The groups options.
 * @returns A decorator function that can be used to apply alpha validation to a property.
 */
export function Alpha(options: IAlphaValidationOptions, groups: IValidationGroupOptions = {}) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'alpha', options, groups });
    };
}
