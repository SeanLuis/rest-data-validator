import { ValidationSchemaBase } from './ValidationSchemaBase';
import { IValidationResult } from '../../interfaces/IValidationResult';

export class LazySchema<T> extends ValidationSchemaBase<T> {
  private schemaFactory: () => ValidationSchemaBase<T>;
  private propertyName?: string;

  constructor(schemaFactory: () => ValidationSchemaBase<T>, propertyName?: string) {
    super();
    this.schemaFactory = schemaFactory;
    this.propertyName = propertyName;
  }

  /**
   * Validates the provided value using the schema factory function.
   * If the value is null or undefined, it checks if the schema allows null values and returns a valid or invalid result accordingly.
   * If the value is valid, it recursively validates any nested values specified by the `propertyName` parameter.
   * @param value - The value to validate.
   * @returns An `IValidationResult` object containing the validation status, errors, and the validated value.
   */
  validate(value: T | null | undefined): IValidationResult {
    // Check if the value is null or undefined
    if (value === null || value === undefined) {
      // If the schema allows null values, return valid
      if (this.isNullable) {
        return { isValid: true, errors: [], value };
      }
      // If null or undefined is not allowed, return error
      return { isValid: false, errors: ['Value cannot be null or undefined.'], value };
    }

    // Validate current value using generated schema
    const schema = this.schemaFactory();
    const result = schema.validate(value as T);

    if (!result.isValid) {
      return result;
    }

    // If propertyName is specified, validate recursively
    if (this.propertyName && typeof value === 'object' && value !== null) {
      const nestedValue = (value as Record<string, unknown>)[this.propertyName];

      // Recursively validate nested value
      return this.validate(nestedValue as T);
    }

    return result;
  }
}