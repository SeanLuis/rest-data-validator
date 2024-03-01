import "reflect-metadata";
import { IEnumValidationOptions } from '../interfaces/IEnumValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

export function EnumValidator<T>(options: IEnumValidationOptions<T>) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'enum', options: options }, target, propertyKey);
    };
}