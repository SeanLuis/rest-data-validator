import "reflect-metadata";
import { IRegexValidationOptions } from '../interfaces/IRegexValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

/**
 * Decorator function that applies a regular expression validation to a property.
 * @param options - The options for the regular expression validation.
 * @returns A decorator function that applies the regular expression validation to the target property.
 */
export function Regex(options: IRegexValidationOptions) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'regex', options: options }, target, propertyKey);
    };
}