import { ValidatorFunction } from "../types/ValidationResult";

export interface IValidatorWithOptions {
  validator: ValidatorFunction<any>;
  options?: any;
}

export interface IChainValidationOptions {
  validators: IValidatorWithOptions[];
}