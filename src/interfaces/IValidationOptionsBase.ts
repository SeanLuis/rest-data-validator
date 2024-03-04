/**
 * The IValidationOptionsBase interface represents common fields for validation options.
 *
 * @interface
 * @property {string} message - Optional: An error message to display if the validation fails. If not provided, a default error message is used.
 */
export interface IValidationOptionsBase {
  message?: string;
}
