import { IValidationOptionsBase } from "./IValidationOptionsBase";

/**
 * The IStringValidationOptions interface represents the options for string validation.
 * This interface is used to handle string validation throughout the application.
 *
 * @interface
 * @property {number} minLength - Optional: The minimum length of the string. If not provided, there is no minimum length.
 * @property {number} maxLength - Optional: The maximum length of the string. If not provided, there is no maximum length.
 * @property {RegExp} regexPattern - Optional: The regular expression pattern to validate the string. If not provided, any string is considered valid.
 * @property {string} message - Optional: An error message to display if the validation fails. If not provided, a default error message is used.
 */
export interface IStringValidationOptions extends IValidationOptionsBase {
    minLength?: number;
    maxLength?: number;
    regexPattern?: RegExp;
}