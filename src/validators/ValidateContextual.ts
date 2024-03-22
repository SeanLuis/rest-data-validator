import { IContextualValidationOptions, IValidationResult } from '../interfaces';

/**
 * The validateContextual function validates data based on provided contextual options.
 *
 * @param {any} value - The data to validate.
 * @param {IContextualValidationOptions} options - The contextual validation options.
 * @returns {IValidationResult} A IValidationResult object containing the validity and error messages.
 */
export const validateContextual = (
    value: any,
    options: IContextualValidationOptions
): IValidationResult => {
    const context = options.getContext();
    const isValid = options.validate(value, context);

    const defaultMessage = `Contextual validation '${options.name}' failed.`;
    const errors = isValid ? [] : [options.message || defaultMessage];

    return { isValid, errors };
};
