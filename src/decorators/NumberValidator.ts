import "reflect-metadata";
import { INumberValidationOptions } from '../interfaces/INumberValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

export function Number(options: INumberValidationOptions) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'number', options: options }, target, propertyKey);
    };
}