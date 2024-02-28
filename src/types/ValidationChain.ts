import { ValidationResult, ValidatorFunction } from "./ValidationResult";

export type ValidationChain = (value: any, ...validators: ValidatorFunction<any>[]) => ValidationResult;
