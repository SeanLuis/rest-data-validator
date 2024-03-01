import "reflect-metadata";
import { IRangeValidationOptions } from '../interfaces/IRangeValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

export function RangeValidator<T>(options: IRangeValidationOptions<T>) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'range', options: options }, target, propertyKey);
    };
}