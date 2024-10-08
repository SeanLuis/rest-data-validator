import {ContextValidation} from '../context/ContextValidation';
import {shouldValidate} from '../utils/validations/ValidationUtils';
import {readFileSync} from 'fs';
import {IDomainValidationOptions, IValidationGroupOptions, IValidationResult} from "../interfaces";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const URL_REGEX = /^(https?:\/\/)?(([a-z\d]([-a-z\d]*[a-z\d])?)\.)+[a-z]{2,}(\/(?:[\w\-\/.%]+)?)*(?:\?[;&=\w%\-]*)?(?:#[\w\-]*)?$/i;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * The validateDomain function validates a domain value based on provided options.
 * It checks if the input is a valid UUID, URL, ISO country code, or ISO language code.
 * For URL validation, it also checks if the URL is secure (https).
 * For ISO country code and ISO language code validation, it checks if the code is included in the provided list or in a JSON file.
 *
 * @function
 * @param {string} value - The domain value to validate.
 * @param {IDomainValidationOptions} options - The validation options.
 * @param {IValidationGroupOptions} groups - The groups options.
 * @returns {IValidationResult} A ValidationResult object that contains a boolean indicating if the domain value is valid and an array of error messages.
 */
export const validateDomain = (
  value: string,
  options: IDomainValidationOptions,
  groups: IValidationGroupOptions = {}
): IValidationResult => {
  const errors: string[] = [];
  const contextGroups = ContextValidation.getInstance().getGroups();

  if (contextGroups.length > 0 && !shouldValidate(contextGroups, groups)) {
    return {isValid: true, errors: []};
  }

  const verifyCodeFromJson = (path: string, property: string, code: string): boolean => {
    try {
      const rawData = readFileSync(path);
      const jsonData = JSON.parse(rawData.toString());
      const codes = jsonData[property];
      if (!Array.isArray(codes)) {
        throw new Error(`The property '${property}' is not an array.`);
      }
      return codes.includes(code);
    } catch (error) {
      throw new Error(`Error reading or parsing JSON from '${path}': ${error}`);
    }
  };

  const addError = (defaultMessage: string) => {
    errors.push(options.message || defaultMessage);
  };

  switch (options.type) {
    case 'uuid':
      if (!UUID_REGEX.test(value)) {
        addError('Value is not a valid UUID.');
      }
      break;
    case 'url':
      const isValidUrl = URL_REGEX.test(value);
      const isSecure = value.startsWith('https://');

      if (!isValidUrl) {
        addError('Value is not a valid URL.');
      } else if (options.mustBeSecure && !isSecure) {
        addError('URL must be secure (https).');
      }
      break;
    case 'isoCountryCode':
      const isValidCountryCode = options.isoCountryCodes?.includes(value) ||
        (options.isoCountryCodePath ? verifyCodeFromJson(options.isoCountryCodePath, options.jsonProperty || 'isoCountryCodes', value) : false);

      if (!isValidCountryCode) {
        addError('Value is not a valid ISO country code.');
      }
      break;
    case 'isoLanguageCode':
      const isValidLanguageCode = options.isoLanguageCodes?.includes(value) ||
        (options.isoLanguageCodePath ? verifyCodeFromJson(options.isoLanguageCodePath, options.jsonProperty || 'isoLanguageCodes', value) : false);

      if (!isValidLanguageCode) {
        addError('Value is not a valid ISO language code.');
      }
      break;
    case 'email':
      if (!EMAIL_REGEX.test(value)) {
        addError('Value is not a valid email address.');
      }
      break;
    default:
      addError('Invalid validation type specified.');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
};