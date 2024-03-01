import "reflect-metadata";
import { IArrayValidationOptions } from '../interfaces/IArrayValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

export function Array<T>(options: IArrayValidationOptions<T>) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'array', options: options }, target, propertyKey);
    };
}
