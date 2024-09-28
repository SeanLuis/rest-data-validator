import { ValidationSchemaBase } from './ValidationSchemaBase';
import { IValidationResult } from '../../interfaces/IValidationResult';

export class LiteralSchema<T extends string | number | boolean> extends ValidationSchemaBase<T> {
  private literalValue: T;

  constructor(literalValue: T) {
    super();
    this.literalValue = literalValue;
  }

  /**
   * Validates the provided value to ensure it matches the literal value defined in the schema.
   * 
   * @param value - The value to be validated.
   * @returns A validation result containing a boolean indicating whether the validation was successful and an array of error messages if it was not.
   */
  validate(value: T | null | undefined): IValidationResult {
    const baseResult = this.baseValidate(value);
    if (!baseResult.isValid) {
      return baseResult;
    }

    const errors: string[] = [...baseResult.errors];

    if (value !== this.literalValue) {
      errors.push(this.customMessage || `Value must be exactly ${this.literalValue}.`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
