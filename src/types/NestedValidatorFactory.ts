import { IValidator } from "../interfaces/INestedValidationOptions";
import { INestedValidationOptions, IValidationResult } from "../interfaces";

type ValidatorFactoryOptions<T> = {
  condition: (value: T) => boolean;
  errorMessage: string;
};

export const simpleValidatorFactory = <T>({ condition, errorMessage }: ValidatorFactoryOptions<T>): IValidator<T> => {
    return {
        validate: (value: T): IValidationResult => {
            const errors: string[] = [];

            if (!condition(value)) {
                errors.push(errorMessage);
            }

            return { isValid: errors.length === 0, errors };
        }
    };
};

type ValidatorUnion = { validator: IValidator<any>, typeGuard: (value: any) => boolean };

export const combinedValidatorFactory = (validators: ValidatorUnion[]): IValidator<any> => {
    return {
        validate: (value: any, options?: INestedValidationOptions<any>): IValidationResult => {
            const errors: string[] = [];

            validators.forEach(({ validator, typeGuard }) => {
                if (typeGuard(value)) {
                    const validationResult = validator.validate(value, options);
                    if (!validationResult.isValid && validationResult.errors) {
                        errors.push(...validationResult.errors);
                    }
                }
            });

            return { isValid: errors.length === 0, errors };
        }
    };
};
