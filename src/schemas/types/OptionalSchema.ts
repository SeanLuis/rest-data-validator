import { ValidationSchemaBase } from './ValidationSchemaBase';
import { IValidationResult } from '../../interfaces/IValidationResult';

export class OptionalSchema<T> extends ValidationSchemaBase<T> {
  private schema: ValidationSchemaBase<T>;

  constructor(schema: ValidationSchemaBase<T>) {
    super();
    this.schema = schema;
  }

  /**
   * Validates the provided value, allowing it to be `undefined` or validating it according to the inner schema.
   * 
   * @param value - The value to be validated.
   * @returns A validation result containing a boolean indicating whether the validation was successful and an array of error messages if it was not.
   */
  validate(value: T | undefined): IValidationResult {
    if (value === undefined) {
      return { isValid: true, errors: [] };
    }

    return this.schema.validate(value);
  }
}
