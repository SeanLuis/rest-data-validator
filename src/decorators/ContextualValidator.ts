import "reflect-metadata";
import { IContextualValidationOptions } from '../interfaces';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";
import {IValidationGroupOptions} from "../interfaces/IValidationGroupOptions";

/**
 * Decorator function for validating values based on a dynamic context.
 * @param options - The contextual validation options.
 * @param groups - The groups options.
 * @returns A decorator function to apply the validation to a class property.
 */
export function Contextual(options: IContextualValidationOptions, groups: IValidationGroupOptions = {}) {
  return function(target: any, propertyName: string | symbol) {
    addValidationMetadata(target, propertyName, { type: 'contextual', options, groups });
  };
}
