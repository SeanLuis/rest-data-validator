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
 * This module exports various context providers functions.
 * @module ContextProviders
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
 * This module exports various schema providers functions.
 * @module SchemaProviders
 */
export {
  convertToSchema,
  loadSchemaFromFile,
  getSchema
} from "./providers/SchemaFileProvider";

/**
 * This module exports various schema validation types.
 * @module Schemas
 */
export * from "./schemas/types";


/**
 * This module exports various schema validation functions.
 * @module Schemas
 */
export { SchemaValidator } from "./schemas/SchemaValidator";

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
import * as schemas from "./schemas/types";

export { interfaces, validators, decorators, sanitizers, events, schemas };
