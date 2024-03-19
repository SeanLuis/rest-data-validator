/**
 * This is the main entry point for the validation library.
 */

/**
 * This module exports various interfaces.
 * @module Interfaces
 */
export {
  IArrayValidationOptions,
  IChainValidationOptions,
  IContextualValidationOptions,
  ICustomValidationOptions,
  IDateValidationOptions,
  IDependencyValidationOptions,
  IDomainValidationOptions,
  IEmailValidationOptions,
  IEnumValidationOptions,
  IFileValidationOptions,
  INestedValidationOptions,
  INumberValidationOptions,
  IPasswordValidationOptions,
  IRangeValidationOptions,
  IRegexValidationOptions,
  ISecurityValidationOptions,
  IStringValidationOptions,
  IValidationOptionsBase
} from "./interfaces";

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
  validateContextual,
  validateNested,
  validateEmail,
  validatePassword,
  validateDependency,
  validateSecurity,
} from "./validators";

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
  String,
  Nested,
  Contextual,
  Email,
  Password,
  Accessors,
  Getter,
  Setter,
  Dependency,
  Security,
} from "./decorators";

/**
 * This module exports various event triggers.
 * @module Events
 */
export { securityEvents } from "./events";

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
  urlEncode,
} from "./sanitizers";

/**
 * This module exports various providers functions.
 * @module Providers
 */
export {
  getContext,
  setContext,
  getGlobalContext,
  setGlobalContext,
  clearContext,
  clearAllContexts,
} from "./providers/ContextProvider";

/**
 * This module exports various types.
 * @module Types
 */
export {
  simpleValidatorFactory,
  combinedValidatorFactory,
} from "./types/NestedValidatorFactory";

import * as interfaces from "./interfaces";
import * as validators from "./validators";
import * as decorators from "./decorators";
import * as sanitizers from "./sanitizers";
import * as events from "./events";

export { interfaces, validators, decorators, sanitizers, events };
