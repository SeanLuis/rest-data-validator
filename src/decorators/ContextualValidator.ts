import "reflect-metadata";
import { IContextualValidationOptions } from '../interfaces/IContextualValidationOptions';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";

/**
 * Decorator function for validating values based on a dynamic context.
 * @param options - The contextual validation options.
 * @returns A decorator function to apply the validation to a class property.
 */
export function Contextual(options: IContextualValidationOptions) {
  return function(target: any, propertyName: string | symbol) {
    addValidationMetadata(target, propertyName, { type: 'contextual', options });
  };
}
