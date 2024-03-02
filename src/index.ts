/**
 * This is the main entry point for the validation library.
 * 
 * It exports various validation functions and decorators for different types of values:
 * - validateArray: Validates an array based on provided options.
 * - validateDate: Validates a date based on provided options.
 * - validateDomain: Validates a domain based on provided options.
 * - validateEnum: Validates an enum based on provided options.
 * - validateFile: Validates a file based on provided options.
 * - validateNumber: Validates a number based on provided options.
 * - validateRange: Validates a range of values based on provided options.
 * - validateRegex: Validates a string based on a provided regular expression pattern.
 * - validateString: Validates a string based on provided options.
 * 
 * It also exports various decorators that can be used to annotate classes for validation:
 * - Required: Marks a property as required.
 * - ClassValidator: Validates a class based on provided options.
 * - Array: Validates an array based on provided options.
 * - Date: Validates a date based on provided options.
 * - Domain: Validates a domain based on provided options.
 * - Enum: Validates an enum based on provided options.
 * - File: Validates a file based on provided options.
 * - Number: Validates a number based on provided options.
 * - Range: Validates a range of values based on provided options.
 * - Regex: Validates a string based on a provided regular expression pattern.
 * - String: Validates a string based on provided options.
 * 
 * It also exports utility functions and metadata for validation:
 * - ValidationUtils: Contains utility functions for validation.
 * - ValidationMetadata: Contains metadata for validation.
 */

export { validateArray } from './validators/ValidateArray';
export { validateDate } from './validators/ValidateDate';
export { validateDomain } from './validators/ValidateDomain';
export { validateEnum } from './validators/ValidateEnum';
export { validateFile } from './validators/ValidateFile';
export { validateNumber } from './validators/ValidateNumber';
export { validateRange } from './validators/ValidateRange';
export { validateRegex } from './validators/ValidateRegex';
export { validateString } from './validators/ValidateString';

export { Required } from './decorators/Required';
export { ClassValidator } from './decorators/ClassValidator';
export { Array } from './decorators/ArrayValidator';
export { Date } from './decorators/DateValidator';
export { Domain } from './decorators/DomainValidator';
export { Enum } from './decorators/EnumValidator';
export { File } from './decorators/FileValidator';
export { Number } from './decorators/NumberValidator';
export { Range } from './decorators/RangeValidator';
export { Regex } from './decorators/RegexValidator';
export { String } from './decorators/StringValidator';

export { ValidationUtils } from './utils/validations/ValidationUtils';
export { ValidationMetadata } from './utils/validations/ValidationMetadata';