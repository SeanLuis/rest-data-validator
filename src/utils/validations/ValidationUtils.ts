import {IValidationGroupOptions, IValidationResult} from "../../interfaces";

import {
  validateAlpha,
  validateArray,
  validateContains,
  validateContextual,
  validateCustom,
  validateDate,
  validateDependency,
  validateDomain,
  validateEmail,
  validateEnum,
  validateFile,
  validateNested,
  validateNumber,
  validatePassword,
  validateRange,
  validateRegex,
  validateSecurity,
  validateString
} from "../../validators";
import {validateMetadataKey} from "./MetadataKeys";

/**
 * The ValidationUtils class provides a static method to validate an object based on metadata attached to its properties.
 * This class uses the reflect-metadata library to retrieve metadata and various validators to validate the properties.
 *
 * @class
 * @method validate - This static method validates an object based on metadata attached to its properties. It takes one parameter: the object to validate. It returns a ValidationResult object that contains a boolean indicating if the object is valid and an array of error messages.
 */
export class ValidationUtils {
  /**
   * Validates an object based on metadata attached to its properties.
   * @param {any} obj - The object to validate.
   * @returns {IValidationResult} A ValidationResult object that contains a boolean indicating if the object is valid and an array of error messages.
   */
  static validate(obj: any): IValidationResult {
    const errors: string[] = [];
    for (const propertyName of Object.keys(obj)) {
      const validations = Reflect.getMetadata(validateMetadataKey, obj, propertyName) || [];

      for (const validation of validations) {
        let result: IValidationResult = {isValid: true, errors: []};

        switch (validation.type) {
          case 'array':
            result = validateArray(obj[propertyName], validation.options, validation.groups);
            break;
          case 'date':
            result = validateDate(obj[propertyName], validation.options, validation.groups);
            break;
          case 'domain':
            result = validateDomain(obj[propertyName], validation.options, validation.groups);
            break;
          case 'enum':
            result = validateEnum(obj[propertyName], validation.options, validation.groups);
            break;
          case 'file':
            result = validateFile(obj[propertyName], validation.options, validation.groups);
            break;
          case 'number':
            result = validateNumber(obj[propertyName], validation.options, validation.groups);
            break;
          case 'range':
            result = validateRange(obj[propertyName], validation.options, validation.groups);
            break;
          case 'regex':
            result = validateRegex(obj[propertyName], validation.options, validation.groups);
            break;
          case 'string':
            result = validateString(obj[propertyName], validation.options, validation.groups);
            break;
          case 'email':
            result = validateEmail(obj[propertyName], validation.options, validation.groups);
            break;
          case 'password':
            result = validatePassword(obj[propertyName], validation.options, validation.groups);
            break;
          case 'custom':
            result = validateCustom(obj[propertyName], validation.options, validation.groups);
            break;
          case 'nested':
            result = validateNested(obj[propertyName], validation.options, validation.groups);
            break;
          case 'contextual':
            result = validateContextual(obj[propertyName], validation.options, validation.groups);
            break;
          case 'dependency':
            result = validateDependency(obj, obj[propertyName], validation.options, validation.groups);
            break;
          case 'security':
            result = validateSecurity(obj[propertyName], validation.options, validation.groups);
            break;
          case 'contains':
            result = validateContains(obj[propertyName], validation.options, validation.groups);
            break;
          case 'alpha':
            result = validateAlpha(obj[propertyName], validation.options, validation.groups);
            break;
          default:
            result = {isValid: false, errors: [`Validation type '${validation.type}' is not supported.`]};
            break;
        }

        if (!result.isValid && result.errors) {
          errors.push(...result.errors);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }
}

/**
 * Checks if the validation should be applied based on the user's groups.
 * @param groups The groups of the current user.
 * @param validationGroups The groups allowed by the validation.
 */
export const shouldValidate = (groups: string[], validationGroups: IValidationGroupOptions = {groups: []}): boolean => {
  if (!validationGroups || !validationGroups.groups || validationGroups.groups.length === 0) {
    return true;
  }
  return validationGroups.groups.some(group => groups.includes(group));
}