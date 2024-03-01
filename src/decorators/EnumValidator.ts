import "reflect-metadata";
import { EnumValidationOptions } from '../interfaces/IEnumValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

export function EnumValidator<T>(options: EnumValidationOptions<T>) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'enum', options: options }, target, propertyKey);
    };
}