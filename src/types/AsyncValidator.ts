/**
 * The AsyncValidator type represents a function that performs asynchronous validation.
 * 
 * The function takes a value of any type T and an optional options object.
 * It returns a Promise that resolves to a IValidationResult object.
 * 
 * @template T The type of the value to validate.
 * @param {T} value - The value to validate.
 * @param {any} [options] - Optional. The validation options.
 * @returns {Promise<IValidationResult>} A Promise that resolves to a IValidationResult object.
 */
import { IValidationResult } from "../interfaces";

export type AsyncValidator<T> = (value: T, options?: any) => Promise<IValidationResult>;