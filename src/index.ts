/**
 * This is the main entry point for the validation library.
 */

/**
 * This module exports various validation functions.
 * @module Validations
 */
export {
    validateArray,
    validateDate,
    validateDomain,
    validateEnum,
    validateFile,
    validateNumber,
    validateRange,
    validateRegex,
    validateString,
    validateCustom,
    validateChain,
    validateNested
} from './validators';

/**
 * This module exports various validation decorators.
 * @module Decorators
 */
export {
    Required,
    ClassValidator,
    Custom,
    Array,
    Date,
    Domain,
    Enum,
    File,
    Number,
    Range,
    Regex,
    String
} from './decorators';


/**
 * This module exports various sanitization functions.
 * @module Sanitizers
 */
export {
    ceil,
    floor,
    round,
    stripHtml,
    toBoolean,
    toDate,
    toFloat,
    toInteger,
    toJson,
    toLowerCase,
    toNumber,
    toUpperCase,
    trim,
    urlDecode,
    urlEncode
} from './sanitizers';

export {
    simpleValidatorFactory,
    combinedValidatorFactory
} from './types/NestedValidatorFactory'

import * as validators from './validators';
import * as decorators from './decorators';
import * as sanitizers from './sanitizers';

export { validators, decorators, sanitizers };