import "reflect-metadata";
import { IDateValidationOptions } from '../interfaces/IDateValidationOptions';
import {validateMetadataKey} from "../utils/validations/MetadataKeys";

export function Date(options: IDateValidationOptions) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'date', options: options }, target, propertyKey);
    };
}