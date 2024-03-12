import { IValidationOptionsBase } from "./IValidationOptionsBase";

/**
 * The IPasswordValidationOptions interface represents the options for password validation.
 * This interface is used to handle password validation throughout the application, allowing for complex security requirements.
 *
 * @interface
 * @property {number} minLength - Optional: The minimum length of the password. This is typically used to enforce password complexity. If not provided, there is no minimum length.
 * @property {number} maxLength - Optional: The maximum length of the password. If not provided, there is no maximum length, although certain systems may impose their own limits.
 * @property {RegExp} regexPattern - Optional: A regular expression pattern to validate the password against custom rules, such as the inclusion of uppercase letters, numbers, and special characters. If not provided, any password format is considered valid as long as it meets length requirements.
 * @property {boolean} mustContainLowercase - Optional: Specifies whether the password must contain at least one lowercase letter.
 * @property {boolean} mustContainUppercase - Optional: Specifies whether the password must contain at least one uppercase letter.
 * @property {boolean} mustContainNumber - Optional: Specifies whether the password must contain at least one number.
 * @property {boolean} mustContainSpecialCharacter - Optional: Specifies whether the password must contain at least one special character from a defined set.
 * @property {string} message - Optional: A custom error message to display if the password validation fails. If not provided, a default error message that includes the failed validation rules is used.
 */
export interface IPasswordValidationOptions extends IValidationOptionsBase {
    minLength?: number;
    maxLength?: number;
    regexPattern?: RegExp;
    mustContainLowercase?: boolean;
    mustContainUppercase?: boolean;
    mustContainNumber?: boolean;
    mustContainSpecialCharacter?: boolean;
    message?: string;
}