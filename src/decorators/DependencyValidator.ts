import "reflect-metadata";
import { IDependencyValidationOptions } from "../interfaces/IDependencyValidationOptions";
import { addValidationMetadata } from "../metadata/AddValidationMetadata";

/**
 * Decorator function that applies dependency validation to a property.
 * @param options - The options for dependency validation.
 * @returns A decorator function.
 */
export function Dependency(options: IDependencyValidationOptions) {
  return function (target: any, propertyName: string | symbol) {
    addValidationMetadata(target, propertyName, {
      type: "dependency",
      options,
    });
  };
}
