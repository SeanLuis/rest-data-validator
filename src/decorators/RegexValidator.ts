import "reflect-metadata";
import { IRegexValidationOptions } from '../interfaces/IRegexValidationOptions';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";

/**
 * Decorator function that applies a regular expression validation to a property.
 * @param options - The options for the regular expression validation.
 * @returns A decorator function that applies the regular expression validation to the target property.
 */
export function Regex(options: IRegexValidationOptions) {
    return function(target: any, propertyName: string | symbol) {
        addValidationMetadata(target, propertyName, { type: 'regex', options });
    };
}