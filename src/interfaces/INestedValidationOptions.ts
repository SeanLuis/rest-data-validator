import { ValidationResult } from "../types/ValidationResult";
import { IValidationOptionsBase } from "./IValidationOptionsBase";

/**
 * Represents a validator interface.
 * Validates the given value.
 * 
 * @param value - The value to be validated.
 * @param validationOptions - Optional validation options.
 * @returns The validation result.
 */
export interface IValidator<T> {
    validate(value: T | any[], validationOptions?: Record<string, any>): ValidationResult;
}
  
/**
 * The INestedValidationOptions interface represents the options for nested validation.
 * It extends from the base validation options to include common functionality,
 * while also providing additional settings specific to nested validation.
 *
 * @interface
 * @extends {IValidationOptionsBase}
 * @property {any} validator - A reference to the validator class or function to be used for the nested validation.
 * @property {Record<string, any>} validationOptions - Additional options for the validator.
 * @property {boolean} each - Indicates whether to apply the validation to each element in an array of objects.
 */
export interface INestedValidationOptions<T> extends IValidationOptionsBase {
    validator: IValidator<T>;
    validationOptions?: Record<string, any>;
    each?: boolean;
}
