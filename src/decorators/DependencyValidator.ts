import "reflect-metadata";
import { IDependencyValidationOptions } from "../interfaces";
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import {IValidationGroupOptions} from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function that applies dependency validation to a property.
 * @param options - The options for dependency validation.
 * @param groups - The groups options.
 * @returns A decorator function.
 */
export function Dependency(options: IDependencyValidationOptions, groups: IValidationGroupOptions = {}) {
  return function (target: any, propertyName: string | symbol) {
    addValidationMetadata(target, propertyName, {
      type: "dependency",
      options,
      groups
    });
  };
}
