/**
 * The IEnumValidationOptions interface represents the options for validating an enum value.
 * This interface is used to handle enum validation throughout the application.
 *
 * @template T The type of the enum.
 *
 * @interface
 * @property {T[]} enum - The enum values to validate against. This is a required property.
 * @property {string} message - Optional: An error message to display if the validation fails. If not provided, a default error message is used.
 */
export interface IEnumValidationOptions<T> {
    enum: T[];
    message?: string;
}