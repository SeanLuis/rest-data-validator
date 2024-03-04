import { IValidationOptionsBase } from "./IValidationOptionsBase";

/**
 * The IRegexValidationOptions interface represents the options for regex validation.
 * This interface is used to handle regex validation throughout the application.
 *
 * @interface
 * @property {RegExp} pattern - The regular expression pattern for validation.
 * @property {string} flags - Optional: The flags for the regular expression. If not provided, no flags are used.
 * @property {string} message - Optional: The custom error message to display. If not provided, a default error message is used.
 * @property {boolean} invertMatch - Optional: Inverts the matching criteria: validates that it does NOT match the pattern. If not provided, the validation checks for a match.
 * @property {boolean} testAgainstTrimmedValue - Optional: Tests the regular expression against the trimmed value. If not provided, the validation checks against the original value.
 * @property {boolean} allowEmptyString - Optional: Allows an empty string as valid regardless of the pattern. If not provided, an empty string is considered invalid.
 * @property {string} message - Optional: An error message to display if the validation fails. If not provided, a default error message is used.
 */
export interface IRegexValidationOptions extends IValidationOptionsBase {
    pattern: RegExp;
    flags?: string;
    message?: string;
    invertMatch?: boolean;
    testAgainstTrimmedValue?: boolean;
    allowEmptyString?: boolean;
}