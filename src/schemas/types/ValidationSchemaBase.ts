import { ISchemaValidationOptions } from '../../interfaces/ISchemaValidationOptions';
import { IValidationResult } from '../../interfaces/IValidationResult';

/**
 * Abstract base class for schema validation.
 * Provides common validation functionality for all schema types.
 * 
 * @abstract
 * @class ValidationSchemaBase
 * @implements {ISchemaValidationOptions<T>}
 * @template T - The type of the value that this schema validates.
 */
export abstract class ValidationSchemaBase<T = any> implements ISchemaValidationOptions<T> {
  protected isNullable: boolean = false;
  protected isRequired: boolean = true;  // Default to required
  protected customMessage?: string;
  protected customValidations: Array<{ fn: (value: T | null | undefined) => boolean; message: string }> = [];

  /**
   * Sets whether the schema should allow `null` values.
   * 
   * @param allow - A boolean indicating whether `null` values are allowed.
   * @returns The current schema to allow method chaining (fluent API).
   */
  nullable(allow: boolean): this {
    this.isNullable = allow;
    return this;
  }

  /**
   * Sets the value as optional, which is the opposite of required.
   * 
   * @returns The current schema to allow method chaining (fluent API).
   */
  optional(): this {
    this.isRequired = false;
    return this;
  }

  /**
   * Sets whether the value being validated is required.
   * 
   * @param required - A boolean indicating whether the value is required.
   * @returns The current schema to allow method chaining (fluent API).
   */
  required(required: boolean = true): this {
    this.isRequired = required;
    return this;
  }

  /**
   * Getter for the `isRequired` property.
   * Allows access to the `isRequired` property in subclasses.
   */
  get isRequiredProperty(): boolean {
    return this.isRequired;
  }

  /**
   * Defines a custom error message to be displayed if any validation fails.
   * 
   * @param message - The custom error message.
   * @returns The current schema to allow method chaining (fluent API).
   */
  message(message: string): this {
    this.customMessage = message;
    return this;
  }

  /**
   * Adds a custom validation function to the schema.
   * 
   * @param validationFn - A function that receives the value and returns a boolean indicating whether the validation was successful.
   * @param errorMessage - An error message that will be included if the validation fails.
   * @returns The current schema to allow method chaining (fluent API).
   */
  addValidation(validationFn: (value: T | null | undefined) => boolean, errorMessage: string): this {
    this.customValidations.push({ fn: validationFn, message: errorMessage });
    return this;
  }

  /**
   * Base validation logic to check for nullability, required fields, and custom validations.
   * 
   * @param value - The value to be validated.
   * @returns A validation result containing a boolean indicating whether the validation was successful and an array of error messages if it was not.
   */
  protected baseValidate(value: T | null | undefined): IValidationResult {
    const errors: string[] = [];

    // Skip validation if value is undefined and the property is not required
    if (value === undefined && !this.isRequired) {
      return { isValid: true, errors: [] };
    }

    // Check for nullability if the value is null
    if (value === null && !this.isNullable) {
      errors.push(this.customMessage || 'Value cannot be null.');
    }

    // Check for requiredness if the value is undefined
    if (value === undefined && this.isRequired) {
      errors.push(this.customMessage || 'Value is required.');
    }

    // Only run custom validations if value is neither null nor undefined
    if (value !== null && value !== undefined) {
      for (const validation of this.customValidations) {
        if (!validation.fn(value)) {
          errors.push(validation.message);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Abstract method to be implemented by derived classes to perform type-specific validation.
   * 
   * @abstract
   * @param value - The value to be validated.
   * @param path - The path of the property being validated (optional, for nested objects).
   * @returns A validation result indicating whether the validation was successful.
   */
  abstract validate(value: T, path?: string): IValidationResult;
}
