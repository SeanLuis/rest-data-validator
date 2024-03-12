import { IValidationOptionsBase } from "./IValidationOptionsBase";

/**
 * Represents the options for dependency validation.
 */
export interface IDependencyValidationOptions extends IValidationOptionsBase {
  /**
   * The name of the dependency.
   */
  name: string;
  
  /**
   * A function that retrieves the dependencies for a given object.
   * @param obj - The object to retrieve dependencies from.
   * @returns The dependencies as a record of key-value pairs.
   */
  getDependencies: (obj: any) => Record<string, any>;
  
  /**
   * A function that validates a value based on its dependencies.
   * @param value - The value to validate.
   * @param dependencies - The dependencies as a record of key-value pairs.
   * @returns A boolean indicating whether the value is valid.
   */
  validate: (value: any, dependencies: Record<string, any>) => boolean;
}
