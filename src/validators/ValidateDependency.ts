import { IDependencyValidationOptions, IValidationResult } from '../interfaces';

export const validateDependency = (
  obj: any,
  value: any,
  options: IDependencyValidationOptions
): IValidationResult => {
  const dependencies = options.getDependencies(obj);
  const isValid = options.validate(value, dependencies);

  const defaultMessage = `Dependency validation '${options.name}' failed.`;
  const errors = isValid ? [] : [options.message || defaultMessage];

  return { isValid, errors };
};