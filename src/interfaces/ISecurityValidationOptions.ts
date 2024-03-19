import { IValidationOptionsBase } from "./IValidationOptionsBase";

/**
 * The ISecurityValidationOptions interface represents the options for a security validator.
 * This interface is used to handle security validation throughout the application.
 *
 * @interface
 * @property {string} type - Defines the type of security validation.
 */
export interface ISecurityValidationOptions extends IValidationOptionsBase {
  type: string;
}
