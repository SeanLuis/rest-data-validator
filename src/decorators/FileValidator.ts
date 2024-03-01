import "reflect-metadata";
import { IFileValidationOptions } from '../interfaces/IFileValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

export function FileValidator(options: IFileValidationOptions) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'file', options: options }, target, propertyKey);
    };
}