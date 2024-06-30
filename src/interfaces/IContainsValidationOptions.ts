import { IValidationOptionsBase } from "./IValidationOptionsBase";

/**
 * The IContainsValidationOptions interface represents the options for validating if a string contains a specific seed.
 *
 * @interface
 * @property {string} seed - The seed string to look for within the main string. This is a required property.
 * @property {boolean} [ignoreCase=false] - Optional: Whether to ignore case when comparing. Defaults to false.
 * @property {number} [minOccurrences=1] - Optional: The minimum number of occurrences of the seed in the string. Defaults to 1.
 */
export interface IContainsValidationOptions extends IValidationOptionsBase {
    seed: string;
    ignoreCase?: boolean;
    minOccurrences?: number;
}
