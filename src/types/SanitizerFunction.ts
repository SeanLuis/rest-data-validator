/**
 * The SanitizerFunction type represents a function that performs sanitization on a value.
 * 
 * The function takes a value of any type T and returns a sanitized value of the same type.
 * 
 * @template T The type of the value to sanitize.
 * @param {T} value - The value to sanitize.
 * @returns {T} The sanitized value.
 */
export type SanitizerFunction<T> = (value: T) => T;