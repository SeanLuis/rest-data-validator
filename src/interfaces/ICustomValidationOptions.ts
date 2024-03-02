/**
 * The ICustomValidator interface represents the options for a custom validator.
 * This interface is used to handle custom validation throughout the application.
 *
 * @interface
 * @property {string} name - The name of the custom validator.
 * @property {Function} validate - The validation function that takes a value and returns a boolean indicating if the value is valid.
 */
export interface ICustomValidationOptions {
    name: string;
    validate: (value: any) => boolean;
}