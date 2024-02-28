import { ValidationResult } from "./ValidationResult";

export type AsyncValidator<T> = (value: T, options?: any) => Promise<ValidationResult>;
