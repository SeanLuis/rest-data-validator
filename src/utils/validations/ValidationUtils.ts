import { ValidationResult } from "../../types/ValidationResult";

import { validateArray } from "../../validators/ValidateArray";
import { validateCustom } from "../../validators/ValidateCustom";
import { validateDate } from "../../validators/ValidateDate";
import { validateDomain } from "../../validators/ValidateDomain";
import { validateEmail } from "../../validators/ValidateEmail";
import { validateEnum } from "../../validators/ValidateEnum";
import { validateFile } from "../../validators/ValidateFile";
import { validateNumber } from "../../validators/ValidateNumber";
import { validateRange } from "../../validators/ValidateRange";
import { validateRegex } from "../../validators/ValidateRegex";
import { validateString } from "../../validators/ValidateString";
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
            const metadata = Reflect.getMetadata(validateMetadataKey, obj, propertyName);
            if (metadata) {
                let result: ValidationResult;

                switch (metadata.type) {
                    case 'array':
                        result = validateArray(obj[propertyName], metadata.options);
                        break;
                    case 'date':
                        result = validateDate(obj[propertyName], metadata.options);
                        break;
                    case 'domain':
                        result = validateDomain(obj[propertyName], metadata.options);
                        break;
                    case 'enum':
                        result = validateEnum(obj[propertyName], metadata.options);
                        break;
                    case 'file':
                        result = validateFile(obj[propertyName], metadata.options);
                        break;
                    case 'number':
                        result = validateNumber(obj[propertyName], metadata.options);
                        break;
                    case 'range':
                        result = validateRange(obj[propertyName], metadata.options);
                        break;
                    case 'regex':
                        result = validateRegex(obj[propertyName], metadata.options);
                        break;
                    case 'string':
                        result = validateString(obj[propertyName], metadata.options);
                        break;
                    case 'email':
                        result = validateEmail(obj[propertyName], metadata.options);
                        break;
                    case 'custom':
                        result = validateCustom(obj[propertyName], metadata.options); // Handle the 'custom' validation type
                        break;
                    default:
                        result = { isValid: false, errors: [`Validation type '${metadata.type}' is not supported.`] };
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