import { IValidationOptionsBase } from "./IValidationOptionsBase";

/**
 * The IDomainValidationOptions interface represents the options for domain validation.
 * This interface is used to handle domain validation throughout the application.
 *
 * @interface
 * @property {'uuid' | 'url' | 'isoCountryCode' | 'isoLanguageCode'} type - The type of validation to perform. Possible values are 'uuid', 'url', 'isoCountryCode', and 'isoLanguageCode'.
 * @property {string[]} isoCountryCodes - Optional: An array of ISO country codes provided by the user. If not provided, all ISO country codes are considered valid.
 * @property {string[]} isoLanguageCodes - Optional: An array of ISO language codes provided by the user. If not provided, all ISO language codes are considered valid.
 * @property {string} isoCountryCodePath - Optional: The path to a JSON file containing ISO country codes. If not provided, the default ISO country codes are used.
 * @property {string} isoLanguageCodePath - Optional: The path to a JSON file containing ISO language codes. If not provided, the default ISO language codes are used.
 * @property {string} jsonProperty - Optional: The property of the JSON to be verified. If not provided, the root of the JSON is used.
 * @property {boolean} mustBeSecure - Optional: Specifies whether the validation must be performed over a secure connection. If not provided, secure connection is not required.
 * @property {string} message - Optional: An error message to display if the validation fails. If not provided, a default error message is used.
 */
export interface IDomainValidationOptions extends IValidationOptionsBase {
    type: 'uuid' | 'url' | 'isoCountryCode' | 'isoLanguageCode';
    isoCountryCodes?: string[];
    isoLanguageCodes?: string[];
    isoCountryCodePath?: string;
    isoLanguageCodePath?: string;
    jsonProperty?: string;
    mustBeSecure?: boolean;
}