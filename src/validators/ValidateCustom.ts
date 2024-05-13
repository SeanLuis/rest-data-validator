import {ICustomValidationOptions, IValidationGroupOptions, IValidationResult} from '../interfaces';
import {ContextValidation} from "../context/ContextValidation";
import {shouldValidate} from "../utils/validations/ValidationUtils";

/**
 * The validateCustom function validates custom data based on provided options.
 *
 * @function
 * @param {any} value - The custom data to validate.
 * @param {ICustomValidationOptions} [options={}] - The validation options.
 * @param {IValidationGroupOptions} groups - The groups options.
 * @returns {IValidationResult} A ValidationResult object that contains a boolean indicating if the data is valid and an array of error messages.
 */
export const validateCustom = (
    value: any,
    options: ICustomValidationOptions,
    groups: IValidationGroupOptions = {}
): IValidationResult => {
    const contextGroups = ContextValidation.getInstance().getGroups();

    if (contextGroups.length > 0 && !shouldValidate(contextGroups, groups))  {
        return { isValid: true, errors: [] };
    }

    // Use the validate function from the options to validate the value
    const isValid = options.validate(value);

    const defaultMessage = `Custom validation '${options.name}' failed.`;
    const errors = isValid ? [] : [options.message || defaultMessage];

    // Return the validation result
    return { isValid, errors };
};