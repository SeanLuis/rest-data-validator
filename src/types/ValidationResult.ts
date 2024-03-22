import { IValidationResult } from "../interfaces";

/**
 * The ValidatorFunction type represents a function that performs validation.
 * 
 * @template T The type of the value to validate.
 * @param {T} value - The value to validate.
 * @param {any} [options] - Optional. The validation options.
 * @returns {IValidationResult} A IValidationResult object.
 */
export type ValidatorFunction<T> = (value: T, options?: any) => IValidationResult
;