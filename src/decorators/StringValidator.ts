import "reflect-metadata";
import { IStringValidationOptions } from '../interfaces/IStringValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

export function StringValidator(options: IStringValidationOptions) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'string', options: options }, target, propertyKey);
    };
}