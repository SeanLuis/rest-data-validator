// validateSecurity.ts
import { ISecurityValidationOptions, IValidationResult } from "../interfaces";
import { securityStrategies } from "../utils/validations/SecurityStrategies";

export const validateSecurity = (
  value: any,
  options: ISecurityValidationOptions
): IValidationResult => {
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

  return { isValid, errors };
};
