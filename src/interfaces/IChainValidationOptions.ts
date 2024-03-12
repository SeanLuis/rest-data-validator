import { ValidatorFunction } from "../types/ValidationResult";

/**
 * The IValidatorWithOptions interface represents a validator function with optional options.
 *
 * @interface
 * @property {ValidatorFunction<any>} validator - The validator function.
 * @property {any} options - Optional options for the validator.
 */
export interface IValidatorWithOptions {
  validator: ValidatorFunction<any>;
  options?: any;
}

/**
 * The IChainValidationOptions interface represents a chain of validators with options.
 *
 * @interface
 * @property {IValidatorWithOptions[]} validators - An array of validators with options.
 */
export interface IChainValidationOptions {
  validators: IValidatorWithOptions[];
}