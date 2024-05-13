import {ISecurityValidationOptions, IValidationGroupOptions, IValidationResult} from "../interfaces";
import {securityStrategies} from "../utils/validations/SecurityStrategies";
import {ContextValidation} from "../context/ContextValidation";
import {shouldValidate} from "../utils/validations/ValidationUtils";

export const validateSecurity = (
  value: any,
  options: ISecurityValidationOptions,
  groups: IValidationGroupOptions = {}
): IValidationResult => {
  const contextGroups = ContextValidation.getInstance().getGroups();

  if (contextGroups.length > 0 && !shouldValidate(contextGroups, groups)) {
    return {isValid: true, errors: []};
  }

  const validateFn =
    securityStrategies[options.type as keyof typeof securityStrategies];
  if (!validateFn) {
    throw new Error(
      `Security validation type '${options.type}' is not supported.`
    );
  }

  const isValid = validateFn(value);

  const defaultMessage = `Security validation '${options.type}' failed.`;
  const errors = isValid ? [] : [options.message || defaultMessage];

  return {isValid, errors};
};
