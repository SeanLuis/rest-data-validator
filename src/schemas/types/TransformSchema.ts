import { ValidationSchemaBase } from './ValidationSchemaBase';
import { IValidationResult } from '../../interfaces/IValidationResult';

export class TransformSchema<T> extends ValidationSchemaBase<T> {
  private schema: ValidationSchemaBase<T>;
  private transformFn: (value: T) => T;

  constructor(schema: ValidationSchemaBase<T>, transformFn: (value: T) => T) {
    super();
    this.schema = schema;
    this.transformFn = transformFn;
  }

  /**
   * Validates the provided value after applying a transformation function to it.
   * 
   * @param value - The value to be validated.
   * @returns A validation result containing a boolean indicating whether the validation was successful and an array of error messages if it was not.
   */
  validate(value: T | null | undefined): IValidationResult {
    // Allow undefined or null values if the schema allows them
    if (value === undefined && !this.isRequiredProperty) {
      return { isValid: true, errors: [], value: value };
    }

    if (value === null && this.isNullable) {
      return { isValid: true, errors: [], value: value };
    }

    // If the value is not null/undefined, apply the transformation and validate
    const transformedValue = (value !== null && value !== undefined) ? this.transformFn(value) : value;
    const validationResult = this.schema.validate(transformedValue as T);

    return {
      ...validationResult,
      value: transformedValue
    };
  }
}
