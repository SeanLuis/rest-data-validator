import { IValidationOptionsBase } from "./IValidationOptionsBase";

/**
 * The IRangeValidationOptions interface represents the options for range validation.
 * This interface is used to handle range validation throughout the application.
 *
 * @template T - The type of the range values.
 *
 * @interface
 * @property {T} min - Optional: The minimum allowed value (can be a number or a date). If not provided, there is no minimum value.
 * @property {T} max - Optional: The maximum allowed value (can be a number or a date). If not provided, there is no maximum value.
 * @property {boolean} inclusive - Optional: Specifies whether the range is inclusive or exclusive. If not provided, the range is considered inclusive.
 * @property {string} message - Optional: The custom error message to display. If not provided, a default error message is used.
 * @property {number} step - Optional: Defines the allowed step between values for numbers (useful for intervals, such as "must be a multiple of"). If not provided, any step is allowed.
 * @property {string} dateFormat - Optional: Specifies the expected date format to correctly validate the input string for dates. If not provided, any date format is considered valid.
 * @property {(value: T) => boolean} customValidator - Optional: A custom validator function that can be used for complex validation logic. If not provided, all values are considered valid.
 * @property {object} errorMessage - Optional: Provides custom error messages for each type of validation. If not provided, default error messages are used.
 * @property {string} errorMessage.min - Optional: The error message for the minimum value validation. If not provided, a default error message is used.
 * @property {string} errorMessage.max - Optional: The error message for the maximum value validation. If not provided, a default error message is used.
 * @property {string} errorMessage.step - Optional: The error message for the step validation. If not provided, a default error message is used.
 * @property {string} errorMessage.dateFormat - Optional: The error message for the date format validation. If not provided, a default error message is used.
 * @property {string} errorMessage.customValidator - Optional: The error message for the custom validator. If not provided, a default error message is used.
 * @property {string} message - Optional: An error message to display if the validation fails. If not provided, a default error message is used.
 */
export interface IRangeValidationOptions<T> extends IValidationOptionsBase {
    min?: T;
    max?: T;
    inclusive?: boolean;
    message?: string;
    step?: number;
    dateFormat?: string;
    customValidator?: (value: T) => boolean;
    errorMessage?: {
        min?: string;
        max?: string;
        step?: string;
        dateFormat?: string;
        customValidator?: string;
    };
}