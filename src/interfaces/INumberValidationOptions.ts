/**
 * The INumberValidationOptions interface represents the options for validating a number.
 * This interface is used to handle number validation throughout the application.
 *
 * @interface
 * @property {number} min - Optional: The minimum allowed value. If not provided, there is no minimum value.
 * @property {number} max - Optional: The maximum allowed value. If not provided, there is no maximum value.
 * @property {boolean} integerOnly - Optional: Specifies if only integer numbers are allowed. If not provided, both integer and non-integer numbers are allowed.
 * @property {boolean} positiveOnly - Optional: Specifies if only positive numbers are allowed. If not provided, both positive and non-positive numbers are allowed.
 * @property {boolean} negativeOnly - Optional: Specifies if only negative numbers are allowed. If not provided, both negative and non-negative numbers are allowed.
 * @property {number} precision - Optional: The maximum number of digits allowed after the decimal point. If not provided, any number of digits is allowed.
 * @property {number} divisibleBy - Optional: The value that the number must be divisible by. If not provided, the number can be divisible by any value.
 * @property {number[]} notEqualTo - Optional: An array of values that the number must not equal to. If not provided, the number can equal to any value.
 * @property {number[]} equalTo - Optional: An array of values that the number can specifically equal to. If not provided, the number can equal to any value.
 */
export interface INumberValidationOptions {
    min?: number;
    max?: number;
    integerOnly?: boolean;
    positiveOnly?: boolean;
    negativeOnly?: boolean;
    precision?: number;
    divisibleBy?: number;
    notEqualTo?: number[];
    equalTo?: number[];
}