import { ValidationSchemaBase } from './ValidationSchemaBase';
import { IValidationResult } from '../../interfaces/IValidationResult';

export class ObjectSchema extends ValidationSchemaBase<Record<string, any>> {
  private schemaDefinition: Record<string, ValidationSchemaBase<any>>;

  constructor(schemaDefinition: Record<string, ValidationSchemaBase<any>>) {
    super();
    this.schemaDefinition = schemaDefinition;
  }

  /**
   * Validates the provided object according to the defined schema.
   * 
   * @param value - The object to be validated.
   * @param path - The current path in the object being validated.
   * @returns A validation result containing a boolean indicating whether the validation was successful and an array of error messages if it was not.
   */
  validate(value: Record<string, any> | null | undefined, path: string = ''): IValidationResult {
    const baseResult = this.baseValidate(value);
    if (!baseResult.isValid) {
      return baseResult;
    }

    const errors: string[] = [...baseResult.errors];

    if (typeof value === 'object' && value !== null) {
      for (const key in this.schemaDefinition) {
        if (this.schemaDefinition.hasOwnProperty(key)) {
          const schema = this.schemaDefinition[key];
          const currentPath = path ? `${path} -> '${key}'` : `'${key}'`;

          // Check if the property exists in the value
          if (value[key] === undefined) {
            if (schema.isRequiredProperty) {
              errors.push(`Validation failed for property ${currentPath}: Property is missing.`);
            }
          } else {
            // Validamos las propiedades internas sin modificar los esquemas primitivos
            const propertyResult = schema.validate(value[key]); // No pasamos el `path` al esquema primitivo
            if (!propertyResult.isValid) {
              // Capturamos los errores del esquema primitivo y agregamos el `path`
              propertyResult.errors.forEach(err => {
                errors.push(`Validation failed for property ${currentPath}: ${err}`);
              });
            }
          }
        }
      }
    } else if (value !== null && value !== undefined) {
      errors.push(this.customMessage || 'Value must be an object.');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
