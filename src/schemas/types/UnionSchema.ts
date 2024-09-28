import { ValidationSchemaBase } from './ValidationSchemaBase';
import { IValidationResult } from '../../interfaces/IValidationResult';

export class UnionSchema<T> extends ValidationSchemaBase<T> {
  private schemas: ValidationSchemaBase<any>[]; // Allow different types of schemas

  constructor(schemas: ValidationSchemaBase<any>[]) {
    super();
    this.schemas = schemas;
  }

  /**
   * Validates the provided value against multiple schemas, allowing it to match any one of them.
   * 
   * @param value - The value to be validated.
   * @returns A validation result containing a boolean indicating whether the validation was successful and an array of error messages if it was not.
   */
  validate(value: any): IValidationResult {
    let errors: string[] = [];
  
    // Iterate through all schemas and attempt validation
    for (const schema of this.schemas) {
      const result = schema.validate(value);

      // If any schema passes, return valid
      if (result.isValid) {
        return { isValid: true, errors: [] };
      }
      
      // Accumulate errors from each failed validation
      errors.push(...result.errors);
    }
  
    // If no schema validates the value, return false and accumulated errors
    return {
      isValid: false,
      errors: [this.customMessage || 'Value does not match any of the allowed types.', ...errors],
    };
  }
}
