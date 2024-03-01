import { validateString } from "../../src";
import { IStringValidationOptions } from "../../src/interfaces/IStringValidationOptions";

describe('validateString', () => {
    it('should pass with a string that meets all criteria', () => {
        const options: IStringValidationOptions = {
            minLength: 3,
            maxLength: 5,
            regexPattern: /^[a-z]+$/ // Solo letras minúsculas
        };
        const value = 'abc';
        expect(validateString(value, options).isValid).toBeTruthy();
    });

    it('should fail if the string is too short', () => {
        const options: IStringValidationOptions = {
            minLength: 3
        };
        const value = 'ab';
        const result = validateString(value, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`String is too short. Minimum length is ${options.minLength}.`);
    });

    it('should fail if the string is too long', () => {
        const options: IStringValidationOptions = {
            maxLength: 5
        };
        const value = 'abcdef';
        const result = validateString(value, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`String is too long. Maximum length is ${options.maxLength}.`);
    });

    it('should fail if the string does not match the required pattern', () => {
        const options: IStringValidationOptions = {
            regexPattern: /^[a-z]+$/ // Solo letras minúsculas
        };
        const value = 'abc123'; // Contiene números, no cumple el patrón
        const result = validateString(value, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`String does not match the required pattern.`);
    });

    it('should handle empty strings appropriately', () => {
        const options: IStringValidationOptions = {
            minLength: 1 // Al menos un carácter
        };
        const value = '';
        const result = validateString(value, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`String is too short. Minimum length is ${options.minLength}.`);
    });

    it('should pass for strings that exactly match the maxLength', () => {
        const options: IStringValidationOptions = {
            maxLength: 5
        };
        const value = 'abcde';
        expect(validateString(value, options).isValid).toBeTruthy();
    });

    it('should pass for strings that exactly match the minLength', () => {
        const options: IStringValidationOptions = {
            minLength: 5
        };
        const value = 'abcde';
        expect(validateString(value, options).isValid).toBeTruthy();
    });
});
