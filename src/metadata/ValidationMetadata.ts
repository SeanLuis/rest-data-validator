import 'reflect-metadata';
import { validateMetadataKey } from "../utils/validations/MetadataKeys";

/**
 * The ValidationMetadata class provides methods to define and retrieve metadata for a property to specify validation options.
 * This class uses the reflect-metadata library to attach and retrieve metadata.
 *
 * @class
 * @method setForProperty - This static method defines metadata for a property to specify validation options. It takes three parameters: the target object, the property name as a string, and the validation options.
 * @method getForProperty - This static method retrieves metadata for a property, if any. It takes two parameters: the target object and the property name as a string.
 */
export class ValidationMetadata {
    /**
     * Defines metadata for a property to specify validation options.
     * @param {Object} target - The target object.
     * @param {string} propertyName - The name of the property.
     * @param {any} validationOptions - The validation options.
     */
    static setForProperty(target: Object, propertyName: string, validationOptions: any) {
        Reflect.defineMetadata(validateMetadataKey, validationOptions, target, propertyName);
    }

    /**
     * Retrieves metadata for a property, if any.
     * @param {Object} target - The target object.
     * @param {string} propertyName - The name of the property.
     * @returns {any} The validation options if they exist, otherwise undefined.
     */
    static getForProperty(target: Object, propertyName: string) {
        return Reflect.getMetadata(validateMetadataKey, target, propertyName);
    }
}