import { IValidationOptionsBase } from "./IValidationOptionsBase";

/**
 * The ICustomValidator interface represents the options for a custom validator.
 * This interface is used to handle custom validation throughout the application.
 *
 * @interface
 * @property {string} name - The name of the custom validator.
 * @property {Function} validate - The validation function that takes a value and returns a boolean indicating if the value is valid.
 * @property {string} message - Optional: An error message to display if the validation fails. If not provided, a default error message is used.
 */
export interface ICustomValidationOptions extends IValidationOptionsBase {
    name: string;
    validate: (value: any) => boolean;
}