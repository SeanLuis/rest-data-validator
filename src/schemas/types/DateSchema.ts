import { ValidationSchemaBase } from './ValidationSchemaBase';
import { IValidationResult } from '../../interfaces/IValidationResult';

export class DateSchema extends ValidationSchemaBase<Date> {
  private minDate?: Date;
  private maxDate?: Date;

  /**
   * Sets the minimum date allowed.
   * 
   * @param date - The minimum date.
   * @returns The current schema to allow method chaining (fluent API).
   */
  min(date: Date): this {
    this.minDate = date;
    return this;
  }

  /**
   * Sets the maximum date allowed.
   * 
   * @param date - The maximum date.
   * @returns The current schema to allow method chaining (fluent API).
   */
  max(date: Date): this {
    this.maxDate = date;
    return this;
  }

  /**
   * Validates the provided value to ensure it is a valid date and falls within the allowed range.
   * 
   * @param value - The date to be validated.
   * @returns A validation result containing a boolean indicating whether the validation was successful and an array of error messages if it was not.
   */
  validate(value: Date | null | undefined): IValidationResult {
    const baseResult = this.baseValidate(value);
    if (!baseResult.isValid) {
      return baseResult;
    }

    const errors: string[] = [...baseResult.errors];

    if (!(value instanceof Date) || isNaN(value.getTime())) {
      errors.push(this.customMessage || 'Value must be a valid date.');
    } else {
      if (this.minDate && value < this.minDate) {
        errors.push(this.customMessage || `Date must be after ${this.minDate.toISOString()}.`);
      }

      if (this.maxDate && value > this.maxDate) {
        errors.push(this.customMessage || `Date must be before ${this.maxDate.toISOString()}.`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
