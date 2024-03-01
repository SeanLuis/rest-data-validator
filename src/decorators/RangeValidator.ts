import "reflect-metadata";
import { RangeValidationOptions } from '../interfaces/IRangeValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

export function RangeValidator<T>(options: RangeValidationOptions<T>) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'range', options: options }, target, propertyKey);
    };
}