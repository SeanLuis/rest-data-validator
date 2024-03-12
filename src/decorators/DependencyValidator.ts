import "reflect-metadata";
import { IDependencyValidationOptions } from '../interfaces/IDependencyValidationOptions';
import { addValidationMetadata } from "../metadata/AddValidationMetadata";

export function Dependency(options: IDependencyValidationOptions) {
  return function(target: any, propertyName: string | symbol) {
    addValidationMetadata(target, propertyName, { type: 'dependency', options });
  };
}
