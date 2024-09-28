import { ValidationSchemaBase } from './ValidationSchemaBase';
import { IValidationResult } from '../../interfaces/IValidationResult';

export class NullableSchema<T> extends ValidationSchemaBase<T | null> {
  private schema: ValidationSchemaBase<T>;

  constructor(schema: ValidationSchemaBase<T>) {
    super();
    this.schema = schema;
  }

  /**
   * Validates the provided value, allowing it to be `null` or validating it according to the inner schema.
   * 
   * @param value - The value to be validated.
   * @returns A validation result containing a boolean indicating whether the validation was successful and an array of error messages if it was not.
   */
  validate(value: T | null | undefined): IValidationResult {
    if (value === null || value === undefined) {
      return { isValid: true, errors: [] };
    }
  
    if (this.schema instanceof ValidationSchemaBase) {
      return this.schema.validate(value);
    }
  
    return { isValid: false, errors: ['Invalid schema provided.'] };
  }
}
