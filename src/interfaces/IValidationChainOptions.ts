import { ValidatorFunction } from "../types/ValidationResult";

export interface IValidatorWithOptions {
    validator: ValidatorFunction<any>;
    options?: any;
  }
  
  export interface IValidationChainOptions {
    validators: IValidatorWithOptions[];
  }