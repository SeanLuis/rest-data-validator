/**
 * The IDateValidationOptions interface represents the options for date validation.
 * This interface is used to handle date validation throughout the application.
 *
 * @interface
 * @property {string} format - Optional: The expected format of the date. If not provided, any format is accepted.
 * @property {Date} before - Optional: The maximum allowed date. If not provided, there is no maximum date.
 * @property {Date} after - Optional: The minimum allowed date. If not provided, there is no minimum date.
 */
export interface IDateValidationOptions {
    format?: string;
    before?: Date;
    after?: Date;
}