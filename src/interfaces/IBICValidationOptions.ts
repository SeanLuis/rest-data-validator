import { IValidationOptionsBase } from "./IValidationOptionsBase";

/**
 * The IBICValidationOptions interface represents the options for validating a BIC code.
 *
 * @interface
 * @property {string} message - Optional: An error message to display if the validation fails. If not provided, a default error message is used.
 */
export interface IBICValidationOptions extends IValidationOptionsBase {}
