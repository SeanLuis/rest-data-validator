import { ValidationSchemaBase } from './ValidationSchemaBase';
import { IValidationResult } from '../../interfaces/IValidationResult';

export class NumberSchema extends ValidationSchemaBase<number | null | undefined> {
  private minValue?: number;
  private maxValue?: number;
  private isIntegerOnly: boolean = false;

  /**
   * Sets the minimum value allowed for the number.
   * 
   * @param value - The minimum value.
   * @returns The current schema to allow method chaining (fluent API).
   */
  min(value: number): this {
    this.minValue = value;
    return this;
  }

  /**
   * Sets the maximum value allowed for the number.
   * 
   * @param value - The maximum value.
   * @returns The current schema to allow method chaining (fluent API).
   */
  max(value: number): this {
    this.maxValue = value;
    return this;
  }

  /**
   * Requires the number to be an integer.
   * 
   * @returns The current schema to allow method chaining (fluent API).
   */
  integer(): this {
    this.isIntegerOnly = true;
    return this;
  }

  /**
   * Validates the provided value to ensure it meets the number schema's criteria.
   * 
   * @param value - The value to be validated.
   * @returns A validation result containing a boolean indicating whether the validation was successful and an array of error messages if it was not.
   */
  validate(value: number | null | undefined): IValidationResult {
    // Use the base validation logic to check for null, undefined, and custom validations
    const baseResult = this.baseValidate(value);
    if (!baseResult.isValid) {
      return baseResult;
    }

    const errors: string[] = [...baseResult.errors];

    if (typeof value === 'number') {
      if (this.minValue !== undefined && value < this.minValue) {
        errors.push(this.customMessage || `Number is too small. Minimum value is ${this.minValue}.`);
      }

      if (this.maxValue !== undefined && value > this.maxValue) {
        errors.push(this.customMessage || `Number is too large. Maximum value is ${this.maxValue}.`);
      }

      if (this.isIntegerOnly && !Number.isInteger(value)) {
        errors.push(this.customMessage || 'Number must be an integer.');
      }
    } else if (value !== null && value !== undefined) {
      errors.push(this.customMessage || 'Value must be a number.');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
