import { SanitizerFunction } from "../types/SanitizerFunction";

/**
 * Trims whitespace from both ends of a string.
 */
export const trim: SanitizerFunction<string, string> = (value: string) => value.trim();

/**
 * Converts a string to lowercase.
 */
export const toLowerCase: SanitizerFunction<string, string> = (value: string) => value.toLowerCase();

/**
 * Converts a string to uppercase.
 */
export const toUpperCase: SanitizerFunction<string, string> = (value: string) => value.toUpperCase();

/**
 * Rounds a number to the nearest integer.
 */
export const round: SanitizerFunction<number, number> = (value: number) => Math.round(value);

/**
 * Converts a string to a number.
 */
export const toNumber: SanitizerFunction<string, number> = (value: string) => parseFloat(value);

/**
 * Floors a number to the nearest lower integer.
 */
export const floor: SanitizerFunction<number, number> = (value: number) => Math.floor(value);

/**
 * Ceils a number to the nearest higher integer.
 */
export const ceil: SanitizerFunction<number, number> = (value: number) => Math.ceil(value);

/**
 * Converts a string to a boolean. It is case insensitive and recognizes 'true' and 'false' as boolean.
 */
export const toBoolean: SanitizerFunction<string, boolean> = (value: string) => value.toLowerCase() === 'true';

/**
 * Removes all HTML tags from a string.
 */
export const stripHtml: SanitizerFunction<string, string> = (value: string) => value.replace(/<[^>]*>?/gm, '');

/**
 * Encodes a string to be used in a URL.
 */
export const urlEncode: SanitizerFunction<string, string> = (value: string) => encodeURIComponent(value);

/**
 * Decodes a URL-encoded string.
 */
export const urlDecode: SanitizerFunction<string, string> = (value: string) => decodeURIComponent(value);

/**
 * Converts a string to a Date object. Returns null if the string cannot be converted.
 */
export const toDate: SanitizerFunction<string, Date | null> = (value: string) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
};

/**
 * Converts a string to an integer. Returns NaN if the string cannot be converted.
 */
export const toInteger: SanitizerFunction<string, number> = (value: string) => parseInt(value, 10);

/**
 * Converts a string to a float. Returns NaN if the string cannot be converted.
 */
export const toFloat: SanitizerFunction<string, number> = (value: string) => parseFloat(value);

/**
 * Converts a string to JSON. Returns null if the string cannot be converted.
 */
export const toJson: SanitizerFunction<string, any> = (value: string) => {
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
};