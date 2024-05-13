import "reflect-metadata";
import { ISecurityValidationOptions } from "../interfaces";
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import {IValidationGroupOptions} from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function that applies security validation to a property.
 * @param options - The options for security validation.
 * @param groups - The groups options.
 * @returns A decorator function.
 */
export function Security(options: ISecurityValidationOptions, groups: IValidationGroupOptions = {}) {
  return function (target: any, propertyName: string | symbol) {
    addValidationMetadata(target, propertyName, { type: "security", options, groups });
  };
}
