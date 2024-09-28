import { ValidationSchemaBase } from './ValidationSchemaBase';
import { IValidationResult } from '../../interfaces/IValidationResult';

export class BooleanSchema extends ValidationSchemaBase<boolean> {

  /**
   * Validates the provided value to ensure it is a boolean.
   * 
   * @param value - The value to be validated.
   * @returns A validation result containing a boolean indicating whether the validation was successful and an array of error messages if it was not.
   */
  validate(value: boolean | null | undefined): IValidationResult {
    const baseResult = this.baseValidate(value);
    if (!baseResult.isValid) {
      return baseResult;
    }

    const errors: string[] = [...baseResult.errors];

    if (typeof value !== 'boolean' && value !== null && value !== undefined) {
      errors.push(this.customMessage || 'Value must be a boolean.');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
