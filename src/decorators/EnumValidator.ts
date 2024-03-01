import "reflect-metadata";
import { IEnumValidationOptions } from '../interfaces/IEnumValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

export function Enum<T>(options: IEnumValidationOptions<T>) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'enum', options: options }, target, propertyKey);
    };
}