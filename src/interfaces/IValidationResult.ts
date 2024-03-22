/**
 * The IValidationResult interface represents the result of a validation.
 * 
 * @interface
 * @property {boolean} isValid - Indicates if the validation passed.
 * @property {string[]} [errors] - Optional. The error messages, if any.
 */
export interface IValidationResult {
    isValid: boolean;
    errors?: string[];
}