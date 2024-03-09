import { validateMetadataKey } from '../utils/validations/MetadataKeys';

/**
 * Adds validation metadata to a target object or property.
 * @param target - The target object or constructor function.
 * @param propertyName - The name of the property to add validation metadata to.
 * @param validationOptions - The validation options to add.
 */
export function addValidationMetadata(target: any, propertyName: string | symbol, validationOptions: any) {
  const existingValidations = Reflect.getMetadata(validateMetadataKey, target, propertyName) || [];
  Reflect.defineMetadata(validateMetadataKey, [...existingValidations, validationOptions], target, propertyName);
}