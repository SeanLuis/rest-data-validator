import "reflect-metadata";
import { IRegexValidationOptions } from '../interfaces/IRegexValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

export function RegexValidator(options: IRegexValidationOptions) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'regex', options: options }, target, propertyKey);
    };
}