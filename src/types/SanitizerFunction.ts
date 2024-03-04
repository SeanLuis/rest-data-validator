/**
 * Represents a function that sanitizes a value of type T and returns a value of type U.
 * @template T The type of the value to be sanitized.
 * @template U The type of the sanitized value.
 * @param value The value to be sanitized.
 * @returns The sanitized value.
 */
export type SanitizerFunction<T, U> = (value: T) => U;