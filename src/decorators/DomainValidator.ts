import "reflect-metadata";
import { IDomainValidationOptions } from '../interfaces/IDomainValidationOptions';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

export function DomainValidator(options: IDomainValidationOptions) {
    return function(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(validateMetadataKey, { type: 'domain', options: options }, target, propertyKey);
    };
}