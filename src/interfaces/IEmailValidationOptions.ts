import { IValidationOptionsBase } from "./IValidationOptionsBase";

/**
 * The IEmailValidationOptions interface represents the options for email validation.
 * This interface is used to handle email validation throughout the application.
 *
 * @interface
 * @property {RegExp} regexPattern - The regular expression pattern to validate the email. A common pattern is provided by default.
 * @property {string} message - Optional: An error message to display if the validation fails. If not provided, a default email validation error message is used.
 */
export interface IEmailValidationOptions extends IValidationOptionsBase {
    regexPattern?: RegExp;
}