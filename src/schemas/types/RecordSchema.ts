import { ValidationSchemaBase } from './ValidationSchemaBase';
import { IValidationResult } from '../../interfaces/IValidationResult';

export class RecordSchema<K extends string | number | symbol, V> extends ValidationSchemaBase<Record<K, V>> {
  private keySchema: ValidationSchemaBase<K>;
  private valueSchema: ValidationSchemaBase<V>;

  constructor(keySchema: ValidationSchemaBase<K>, valueSchema: ValidationSchemaBase<V>) {
    super();
    this.keySchema = keySchema;
    this.valueSchema = valueSchema;
  }

  /**
   * Validates the provided record, ensuring all keys and values match the defined schemas.
   * 
   * @param value - The record to be validated.
   * @returns A validation result containing a boolean indicating whether the validation was successful and an array of error messages if it was not.
   */
  validate(value: Record<K, V> | null | undefined): IValidationResult {
    const baseResult = this.baseValidate(value);
    if (!baseResult.isValid) {
      return baseResult;
    }

    const errors: string[] = [...baseResult.errors];

    if (typeof value !== 'object' || value === null) {
      errors.push(this.customMessage || 'Value must be a record.');
    } else {
      for (const key in value) {
        const keyResult = this.keySchema.validate(key as K);
        if (!keyResult.isValid) {
          errors.push(`Invalid key '${key}': ${keyResult.errors.join(', ')}`);
        }

        const valueResult = this.valueSchema.validate(value[key]);
        if (!valueResult.isValid) {
          errors.push(`Invalid value for key '${key}': ${valueResult.errors.join(', ')}`);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
