import { ValidationResult } from "./ValidationResult";

export type CustomValidator<T> = (value: T, options?: any) => ValidationResult;
