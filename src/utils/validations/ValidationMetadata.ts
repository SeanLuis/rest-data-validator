import 'reflect-metadata';
import { validateMetadataKey } from "./MetadataKeys";

export class ValidationMetadata {
    // Define metadata for a property to specify validation options
    static setForProperty(target: Object, propertyName: string, validationOptions: any) {
        Reflect.defineMetadata(validateMetadataKey, validationOptions, target, propertyName);
    }

    // Retrieve metadata for a property, if any
    static getForProperty(target: Object, propertyName: string) {
        return Reflect.getMetadata(validateMetadataKey, target, propertyName);
    }
}
