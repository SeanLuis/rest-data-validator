/**
 * The IValidationResult interface represents the result of a validation.
 * 
 * @interface
 * @property {boolean} isValid - Indicates if the validation passed.
 * @property {string[]} [errors] - The error messages, if any.
 * @property {any} value - Optional. The input value, if any.
 */
export interface IValidationResult {
    isValid: boolean;
    errors: string[];
    value?: any;
}