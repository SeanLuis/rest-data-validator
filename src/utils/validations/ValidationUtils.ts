import { ValidationResult } from "../../types/ValidationResult";

import { validateArray } from "../../validators/ValidateArray";
import { validateDate } from "../../validators/ValidateDate";
import { validateDomain } from "../../validators/ValidateDomain";
import { validateEnum } from "../../validators/ValidateEnum";
import { validateFile } from "../../validators/ValidateFile";
import { validateNumber } from "../../validators/ValidateNumber";
import { validateRange } from "../../validators/ValidateRange";
import { validateRegex } from "../../validators/ValidateRegex";
import { validateString } from "../../validators/ValidateString";
import { validateMetadataKey } from "./MetadataKeys";

export class ValidationUtils {
    static validate(obj: any): ValidationResult {
        const errors: string[] = [];
        for (const propertyName of Object.keys(obj)) {
            const metadata = Reflect.getMetadata(validateMetadataKey, obj, propertyName);
            if (metadata) {
                // Asegúrate de que cada validador devuelve un resultado con un array 'errors'.
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
                    default:
                        result = { isValid: false, errors: [`Validation type '${metadata.type}' is not supported.`] };
                        break;
                }

                // Si hay errores, agrega todos ellos al array de errores.
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
