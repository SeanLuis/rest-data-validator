import { IValidationResult } from './IValidationResult';

/**
 * Interface representing the options for schema validation.
 * This serves as a base for defining validation behavior in various schema types.
 * 
 * @interface ISchemaValidationOptions
 * @template T - The type of the value that this schema validates.
 */
export interface ISchemaValidationOptions<T = any> {
  /**
   * Validates the provided value according to the defined schema.
   * 
   * @param value - The value to be validated.
   * @returns A validation result containing a boolean indicating whether the validation was successful and an array of error messages if it was not.
   */
  validate(value: T | null | undefined): IValidationResult;

  /**
   * Adds a custom validation function to the schema.
   * 
   * @param validationFn - A function that receives the value and returns a boolean indicating whether the validation was successful.
   * @param errorMessage - An error message that will be included if the validation fails.
   * @returns The current schema to allow method chaining (fluent API).
   */
  addValidation(validationFn: (value: T | null | undefined) => boolean, errorMessage: string): this;

  /**
   * Sets whether the schema should allow `null` values.
   * 
   * @param allow - A boolean indicating whether `null` values are allowed.
   * @returns The current schema to allow method chaining (fluent API).
   */
  nullable(allow: boolean): this;

  /**
   * Defines a custom error message to be displayed if any validation fails.
   * 
   * @param message - The custom error message.
   * @returns The current schema to allow method chaining (fluent API).
   */
  message(message: string): this;

  /**
   * Sets whether the value being validated is required.
   * 
   * @param required - A boolean indicating whether the value is required.
   * @returns The current schema to allow method chaining (fluent API).
   */
  required(required: boolean): this;
}
