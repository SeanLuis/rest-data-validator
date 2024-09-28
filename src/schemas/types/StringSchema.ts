import { ValidationSchemaBase } from './ValidationSchemaBase';
import { IValidationResult } from '../../interfaces/IValidationResult';

export class StringSchema extends ValidationSchemaBase<string> {
  private minLength?: number;
  private maxLength?: number;

  min(length: number): this {
    this.minLength = length;
    return this;
  }

  max(length: number): this {
    this.maxLength = length;
    return this;
  }

  validate(value: string | null | undefined): IValidationResult {
    // If the value is undefined and the property is optional, return a valid result
    if (value === undefined && !this.isRequired) {
      return { isValid: true, errors: [] };
    }

    const baseResult = this.baseValidate(value);
    if (!baseResult.isValid) {
      return baseResult;
    }
  
    const errors: string[] = baseResult.errors ?? [];

    if (typeof value !== 'string') {
      errors.push('Value must be a string.');
    }
  
    if (typeof value === 'string') {
      if (this.minLength !== undefined && value.length < this.minLength) {
        errors.push(this.customMessage || `String is too short. Minimum length is ${this.minLength}.`);
      }
  
      if (this.maxLength !== undefined && value.length > this.maxLength) {
        errors.push(this.customMessage || `String is too long. Maximum length is ${this.maxLength}.`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
