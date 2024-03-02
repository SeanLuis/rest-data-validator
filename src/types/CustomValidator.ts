/**
 * The CustomValidator type represents a function that performs custom validation.
 * 
 * The function takes a value of any type T and an optional options object.
 * It returns a ValidationResult object.
 * 
 * @template T The type of the value to validate.
 * @param {T} value - The value to validate.
 * @param {any} [options] - Optional. The validation options.
 * @returns {ValidationResult} A ValidationResult object.
 */
import { ValidationResult } from "./ValidationResult";

export type CustomValidator<T> = (value: T, options?: any) => ValidationResult;