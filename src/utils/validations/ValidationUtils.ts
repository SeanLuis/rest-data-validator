import { ValidationResult } from "../../types/ValidationResult";

import {
    validateArray,
    validateContextual,
    validateCustom,
    validateDate,
    validateDomain,
    validateEmail,
    validateEnum,
    validateFile,
    validateNested,
    validateNumber,
    validateRange,
    validateRegex,
    validateString,
    validatePassword,
} from "../../validators";
import { validateMetadataKey } from "./MetadataKeys";

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
     * @returns {ValidationResult} A ValidationResult object that contains a boolean indicating if the object is valid and an array of error messages.
     */
    static validate(obj: any): ValidationResult {
        const errors: string[] = [];
        for (const propertyName of Object.keys(obj)) {
            const validations = Reflect.getMetadata(validateMetadataKey, obj, propertyName) || [];

            for (const validation of validations) {
                let result: ValidationResult = { isValid: true, errors: [] };

                switch (validation.type) {
                    case 'array':
                        result = validateArray(obj[propertyName], validation.options);
                        break;
                    case 'date':
                        result = validateDate(obj[propertyName], validation.options);
                        break;
                    case 'domain':
                        result = validateDomain(obj[propertyName], validation.options);
                        break;
                    case 'enum':
                        result = validateEnum(obj[propertyName], validation.options);
                        break;
                    case 'file':
                        result = validateFile(obj[propertyName], validation.options);
                        break;
                    case 'number':
                        result = validateNumber(obj[propertyName], validation.options);
                        break;
                    case 'range':
                        result = validateRange(obj[propertyName], validation.options);
                        break;
                    case 'regex':
                        result = validateRegex(obj[propertyName], validation.options);
                        break;
                    case 'string':
                        result = validateString(obj[propertyName], validation.options);
                        break;
                    case 'email':
                        result = validateEmail(obj[propertyName], validation.options);
                        break;
                      case 'password':
                        result = validatePassword(obj[propertyName], validation.options);
                        break;
                    case 'custom':
                        result = validateCustom(obj[propertyName], validation.options); // Handle the 'custom' validation type
                        break;
                    case 'nested':
                        result = validateNested(obj[propertyName], validation.options);
                        break;
                    case 'contextual':
                        result = validateContextual(obj[propertyName], validation.options);
                        break;
                    default:
                        result = { isValid: false, errors: [`Validation type '${validation.type}' is not supported.`] };
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