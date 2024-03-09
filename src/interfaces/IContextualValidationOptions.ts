import { IValidationOptionsBase } from "./IValidationOptionsBase";

/**
 * The IContextualValidationOptions interface extends IValidationOptionsBase to include
 * contextual validation functionality. It allows for defining validation logic that
 * depends on a dynamic context.
 *
 * @interface
 * @property {string} name - The name of the validation option.
 * @property {Function} getContext - A function that returns the context for validation.
 * @property {Function} validate - A function that performs the validation.
 */
export interface IContextualValidationOptions extends IValidationOptionsBase {
  name: string;
  getContext: () => Record<string, any>;
  validate: (value: any, context: Record<string, any>) => boolean;
}

