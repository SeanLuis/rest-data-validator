/**
 * The ValidationResult interface represents the result of a validation.
 * 
 * @interface
 * @property {boolean} isValid - Indicates if the validation passed.
 * @property {string[]} [errors] - Optional. The error messages, if any.
 */
export interface ValidationResult {
    isValid: boolean;
    errors?: string[];
}

/**
 * The ValidatorConfig interface represents the configuration for a validator.
 * 
 * @interface
 * @property {boolean} [allowUndefined] - Optional. Indicates if undefined values are allowed.
 * @property {string} [defaultErrorMessage] - Optional. The default error message to use.
 */
export interface ValidatorConfig {
    allowUndefined?: boolean;
    defaultErrorMessage?: string;
}

/**
 * The ValidatorFunction type represents a function that performs validation.
 * 
 * @template T The type of the value to validate.
 * @param {T} value - The value to validate.
 * @param {any} [options] - Optional. The validation options.
 * @returns {ValidationResult} A ValidationResult object.
 */
export type ValidatorFunction<T> = (value: T, options?: any) => ValidationResult;