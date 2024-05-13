import {IDependencyValidationOptions, IValidationGroupOptions, IValidationResult} from '../interfaces';
import {ContextValidation} from "../context/ContextValidation";
import {shouldValidate} from "../utils/validations/ValidationUtils";

export const validateDependency = (
  obj: any,
  value: any,
  options: IDependencyValidationOptions,
  groups: IValidationGroupOptions = {}
): IValidationResult => {
  const contextGroups = ContextValidation.getInstance().getGroups();

  if (contextGroups.length > 0 && !shouldValidate(contextGroups, groups)) {
    return {isValid: true, errors: []};
  }

  const dependencies = options.getDependencies(obj);
  const isValid = options.validate(value, dependencies);

  const defaultMessage = `Dependency validation '${options.name}' failed.`;
  const errors = isValid ? [] : [options.message || defaultMessage];

  return {isValid, errors};
};