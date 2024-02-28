export interface ValidationResult {
    isValid: boolean;
    errors?: string[];
}

export interface ValidatorConfig {
    allowUndefined?: boolean;
    defaultErrorMessage?: string;
}

export type ValidatorFunction<T> = (value: T, options?: any) => ValidationResult;
