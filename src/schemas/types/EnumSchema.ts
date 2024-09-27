import { ValidationSchemaBase } from './ValidationSchemaBase';
import { IValidationResult } from '../../interfaces/IValidationResult';

export class EnumSchema<T> extends ValidationSchemaBase<T> {
  private allowedValues: T[];

  constructor(allowedValues: T[]) {
    super();
    this.allowedValues = allowedValues;
  }

  /**
   * Validates the provided value to ensure it matches one of the allowed enum values.
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

    if (!this.allowedValues.includes(value!)) {
      errors.push(this.customMessage || `Value must be one of the following: ${this.allowedValues.join(', ')}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
