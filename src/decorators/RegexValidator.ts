import "reflect-metadata";
import { RegexValidationOptions } from '../interfaces/IRegexValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

export function RegexValidator(options: RegexValidationOptions) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'regex', options: options }, target, propertyKey);
    };
}