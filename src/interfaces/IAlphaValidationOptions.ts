import { IValidationOptionsBase } from "./IValidationOptionsBase";

/**
 * The IAlphaValidationOptions interface represents the options for validating if a string contains only letters.
 *
 * @interface
 * @property {string} [locale='en-US'] - Optional: The locale to use for validation. Defaults to 'en-US'.
 * @property {string | RegExp} [ignore] - Optional: Characters to ignore during validation.
 */
export interface IAlphaValidationOptions extends IValidationOptionsBase {
  locale?: string;
  ignore?: string | RegExp;
}
