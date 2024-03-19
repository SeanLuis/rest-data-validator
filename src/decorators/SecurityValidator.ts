import "reflect-metadata";
import { ISecurityValidationOptions } from "../interfaces/ISecurityValidationOptions";
import { addValidationMetadata } from "../metadata/AddValidationMetadata";

/**
 * Decorator function that applies security validation to a property.
 * @param options - The options for security validation.
 * @returns A decorator function.
 */
export function Security(options: ISecurityValidationOptions) {
  return function (target: any, propertyName: string | symbol) {
    addValidationMetadata(target, propertyName, { type: "security", options });
  };
}
