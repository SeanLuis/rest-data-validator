// validateDomain.test.ts

import { IDomainValidationOptions } from "../../src/interfaces/IDomainValidationOptions";
import { validateDomainValue } from "../../src/validators/ValidateDomain";
import { readFileSync } from 'fs';

// Mock fs para evitar leer archivos reales durante las pruebas
jest.mock('fs', () => ({
  readFileSync: jest.fn((path) => {
    if (path.includes('invalidpath')) {
      throw new Error('File cannot be read');
    } else if (path.includes('invalidjson')) {
      return 'not valid json';
    }
    switch (path) {
      case 'tests/validators/files/iso_country_codes.json':
        return JSON.stringify({ isoCountryCodes: ['US', 'CA', 'GB'] });
      case 'tests/validators/files/iso_language_codes.json':
        return JSON.stringify({ isoLanguageCodes: ['en', 'fr', 'es'] });
      default:
        throw new Error(`File not found: ${path}`);
    }
  })
}));

describe('validateDomainValue', () => {
  it('should validate a UUID correctly', () => {
    const options: IDomainValidationOptions = { type: 'uuid' };
    const validUUID = '123e4567-e89b-12d3-a456-426614174000';
    const invalidUUID = '123e4567-e89b-12d3-a456-42661417400Z'; // Invalid character

    expect(validateDomainValue(validUUID, options).isValid).toBeTruthy();
    expect(validateDomainValue(invalidUUID, options).isValid).toBeFalsy();
  });

  it('should validate a URL correctly', () => {
    const options: IDomainValidationOptions = { type: 'url' };
    const validURL = 'https://www.example.com';
    const invalidURL = 'htttps://www.example.com'; // Typo in protocol

    expect(validateDomainValue(validURL, options).isValid).toBeTruthy();
    expect(validateDomainValue(invalidURL, options).isValid).toBeFalsy();
  });

  it('should validate an ISO country code correctly', () => {
    const options: IDomainValidationOptions = { type: 'isoCountryCode', isoCountryCodes: ['US', 'CA', 'GB'] };
    const validCountryCode = 'US';
    const invalidCountryCode = 'XX'; // Not a valid country code

    expect(validateDomainValue(validCountryCode, options).isValid).toBeTruthy();
    expect(validateDomainValue(invalidCountryCode, options).isValid).toBeFalsy();
  });

  it('should validate an ISO language code correctly', () => {
    const options: IDomainValidationOptions = { type: 'isoLanguageCode', isoLanguageCodes: ['en', 'fr', 'es'] };
    const validLanguageCode = 'en';
    const invalidLanguageCode = 'xx'; // Not a valid language code

    expect(validateDomainValue(validLanguageCode, options).isValid).toBeTruthy();
    expect(validateDomainValue(invalidLanguageCode, options).isValid).toBeFalsy();
  });

  it('should validate using ISO codes from a provided JSON file path', () => {
    const options: IDomainValidationOptions = {
      type: 'isoCountryCode',
      isoCountryCodePath: 'tests/validators/files/iso_country_codes.json',
      jsonProperty: 'isoCountryCodes'
    };

    const validCountryCode = 'US';
    const invalidCountryCode = 'XX'; // Not a valid country code

    expect(validateDomainValue(validCountryCode, options).isValid).toBeTruthy();
    expect(validateDomainValue(invalidCountryCode, options).isValid).toBeFalsy();
  });

  it('should throw an error if the JSON file cannot be read', () => {
    const options: IDomainValidationOptions = {
      type: 'isoCountryCode',
      isoCountryCodePath: 'path/to/invalidpath.json',
      jsonProperty: 'isoCountryCodes'
    };

    const countryCode = 'US';

    expect(() => validateDomainValue(countryCode, options)).toThrow('File cannot be read');
  });

  it('should throw an error if the JSON is invalid', () => {
    const options: IDomainValidationOptions = {
      type: 'isoCountryCode',
      isoCountryCodePath: 'path/to/invalidjson.json',
      jsonProperty: 'isoCountryCodes'
    };

    const countryCode = 'US';

    expect(() => validateDomainValue(countryCode, options)).toThrow();
  });
});

// Restaura el mock después de todas las pruebas
afterAll(() => {
  jest.restoreAllMocks();
});
