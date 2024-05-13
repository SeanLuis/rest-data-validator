import "reflect-metadata";
import { IRegexValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import {IValidationGroupOptions} from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function that applies a regular expression validation to a property.
 * @param options - The options for the regular expression validation.
 * @param groups - The groups options.
 * @returns A decorator function that applies the regular expression validation to the target property.
 */
export function Regex(options: IRegexValidationOptions, groups: IValidationGroupOptions = {}) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'regex', options, groups });
    };
}