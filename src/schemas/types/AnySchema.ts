import { ValidationSchemaBase } from './ValidationSchemaBase';
import { IValidationResult } from '../../interfaces/IValidationResult';

export class AnySchema extends ValidationSchemaBase<any> {

  /**
   * Validates the provided value, considering any value as valid 
   * unless restricted by the required or nullable settings.
   * 
   * @param value - The value to be validated.
   * @returns A validation result indicating whether the validation was successful.
   */
  validate(value: any): IValidationResult {
    // If the value is undefined and the schema is not required, it's valid
    if (value === undefined && !this.isRequiredProperty) {
      return { isValid: true, errors: [] };
    }

    // If the value is null and the schema allows nulls, it's valid
    if (value === null && this.isNullable) {
      return { isValid: true, errors: [] };
    }

    // If the value is undefined but required, it should fail
    if (value === undefined && this.isRequiredProperty) {
      return { isValid: false, errors: [this.customMessage || 'Value is required.'] };
    }

    // If the value is null but not nullable, it should fail
    if (value === null && !this.isNullable) {
      return { isValid: false, errors: [this.customMessage || 'Value cannot be null.'] };
    }

    // Any other value should be considered valid
    return { isValid: true, errors: [] };
  }
}
