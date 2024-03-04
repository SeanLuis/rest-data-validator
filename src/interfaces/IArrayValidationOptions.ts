import { ValidatorFunction } from "../types/ValidationResult";
import { IValidationOptionsBase } from "./IValidationOptionsBase";

/**
 * The IArrayValidationOptions interface represents the options for validating an array.
 * This interface is used to handle array validation throughout the application.
 *
 * @template T The type of elements in the array.
 *
 * @interface
 * @property {number} minLength - Optional: The minimum length of the array. If not provided, there is no minimum length.
 * @property {number} maxLength - Optional: The maximum length of the array. If not provided, there is no maximum length.
 * @property {boolean} unique - Optional: Specifies whether the array should contain unique elements. If not provided, uniqueness is not required.
 * @property {ValidatorFunction<T>} validator - Optional: The validator function to validate each element in the array. If not provided, no additional validation is performed on the elements.
 * @property {string} message - Optional: An error message to display if the validation fails. If not provided, a default error message is used.
*/
export interface IArrayValidationOptions<T> extends IValidationOptionsBase {
    minLength?: number;
    maxLength?: number;
    unique?: boolean;
    validator?: ValidatorFunction<T>;
}