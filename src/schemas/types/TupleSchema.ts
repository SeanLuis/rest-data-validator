import { ValidationSchemaBase } from './ValidationSchemaBase';
import { IValidationResult } from '../../interfaces/IValidationResult';

export class TupleSchema<T extends any[]> extends ValidationSchemaBase<T> {
  private schemas: { [K in keyof T]: ValidationSchemaBase<T[K]> };

  constructor(schemas: { [K in keyof T]: ValidationSchemaBase<T[K]> }) {
    super();
    this.schemas = schemas;
  }

  /**
   * Validates the provided tuple, ensuring it matches the defined schemas in order and length.
   * 
   * @param value - The tuple to be validated.
   * @returns A validation result containing a boolean indicating whether the validation was successful and an array of error messages if it was not.
   */
  validate(value: T | null | undefined): IValidationResult {
    const baseResult = this.baseValidate(value);
    if (!baseResult.isValid) {
      return baseResult;
    }

    const errors: string[] = [...baseResult.errors];

    // Check if value is a tuple (array) and has the correct length
    if (!Array.isArray(value) || value.length !== this.schemas.length) {
      errors.push(this.customMessage || `Tuple must have exactly ${this.schemas.length} elements.`);
      return { isValid: false, errors };
    }

    // Validate each element in the tuple
    for (let i = 0; i < this.schemas.length; i++) {
      const result = this.schemas[i].validate(value[i]);
      if (!result.isValid) {
        errors.push(`Validation failed for tuple element at index ${i}: ${result.errors.join(', ')}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
