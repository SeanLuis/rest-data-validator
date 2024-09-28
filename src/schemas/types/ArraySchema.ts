import { ValidationSchemaBase } from './ValidationSchemaBase';
import { IValidationResult } from '../../interfaces/IValidationResult';

export class ArraySchema<T> extends ValidationSchemaBase<T[]> {
  private itemSchema?: ValidationSchemaBase<T>;
  private minLength?: number;
  private maxLength?: number;

  constructor(itemSchema?: ValidationSchemaBase<T>) {
    super();
    this.itemSchema = itemSchema;
  }

  /**
   * Sets the minimum length of the array.
   * 
   * @param length - The minimum number of elements the array must have.
   * @returns The current schema to allow method chaining (fluent API).
   */
  min(length: number): this {
    this.minLength = length;
    return this;
  }

  /**
   * Sets the maximum length of the array.
   * 
   * @param length - The maximum number of elements the array can have.
   * @returns The current schema to allow method chaining (fluent API).
   */
  max(length: number): this {
    this.maxLength = length;
    return this;
  }

  /**
   * Validates the array and its elements according to the defined schema.
   * 
   * @param value - The array to be validated.
   * @returns A validation result containing a boolean indicating whether the validation was successful and an array of error messages if it was not.
   */
  validate(value: T[] | null | undefined): IValidationResult {
    const baseResult = this.baseValidate(value);
    if (!baseResult.isValid) {
      return baseResult;
    }
  
    const errors: string[] = [...baseResult.errors];
  
    // First, check if the value is actually an array
    if (!Array.isArray(value)) {
      return {
        isValid: false,
        errors: ['Expected an array.'], // Explicit error if the value is not an array
      };
    }
  
    // Check for minimum and maximum length constraints
    if (this.minLength !== undefined && value.length < this.minLength) {
      errors.push(this.customMessage || `Array is too short. Minimum length is ${this.minLength}.`);
    }
  
    if (this.maxLength !== undefined && value.length > this.maxLength) {
      errors.push(this.customMessage || `Array is too long. Maximum length is ${this.maxLength}.`);
    }
  
    // If itemSchema is provided, validate each item in the array
    if (this.itemSchema) {
      value.forEach((item, index) => {
        const itemResult = this.itemSchema!.validate(item);
        if (!itemResult.isValid) {
          errors.push(`Error at index ${index}: ${itemResult.errors.join(', ')}`);
        }
      });
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}  
