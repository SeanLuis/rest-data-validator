/**
 * This is the main entry point for the validation library.
 */

/**
 * This module exports various interfaces.
 * @module Interfaces
 */
export * from "./interfaces";

/**
 * This module exports various validation functions.
 * @module Validations
 */
export * from "./validators";

/**
 * This module exports various validation decorators.
 * @module Decorators
 */
export * from "./decorators";

/**
 * This module exports various event triggers.
 * @module Events
 */
export { securityEvents } from "./events";

/**
 * This module exports various sanitization functions.
 * @module Sanitizers
 */
export * from "./sanitizers";

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
 * This module exports various contexts functions.
 * @module Context
 */
export {
  ContextValidation
} from "./context/ContextValidation";

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
