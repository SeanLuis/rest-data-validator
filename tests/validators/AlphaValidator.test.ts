import { validateAlpha } from "../../src";
import { IAlphaValidationOptions } from "../../src/interfaces/IAlphaValidationOptions";

describe('validateAlpha', () => {
    it('should pass when the string contains only letters', () => {
        const options: IAlphaValidationOptions = { locale: 'en-US' };
        const str = 'HelloWorld';
        expect(validateAlpha(str, options).isValid).toBeTruthy();
    });

    it('should fail when the string contains non-letter characters', () => {
        const options: IAlphaValidationOptions = { locale: 'en-US' };
        const str = 'Hello123';
        const result = validateAlpha(str, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain("String contains invalid characters for locale 'en-US'.");
    });

    it('should be locale-sensitive', () => {
        const options: IAlphaValidationOptions = { locale: 'de-DE' };
        const str = 'ÄÖÜß';
        expect(validateAlpha(str, options).isValid).toBeTruthy();
    });

    it('should fail for unsupported locale', () => {
        const options: IAlphaValidationOptions = { locale: 'unsupported-locale' };
        const str = 'Hello';
        expect(() => validateAlpha(str, options)).toThrow("Invalid locale 'unsupported-locale'");
    });

    it('should respect the ignore option (string)', () => {
        const options: IAlphaValidationOptions = { locale: 'en-US', ignore: '-' };
        const str = 'Hello-World';
        expect(validateAlpha(str, options).isValid).toBeTruthy();
    });

    it('should respect the ignore option (RegExp)', () => {
        const options: IAlphaValidationOptions = { locale: 'en-US', ignore: /-/g };
        const str = 'Hello-World';
        expect(validateAlpha(str, options).isValid).toBeTruthy();
    });

    it('should handle strings with spaces when ignored', () => {
        const options: IAlphaValidationOptions = { locale: 'en-US', ignore: ' ' };
        const str = 'Hello World';
        expect(validateAlpha(str, options).isValid).toBeTruthy();
    });

    it('should use the default error message if none is provided', () => {
        const options: IAlphaValidationOptions = { locale: 'en-US' };
        const str = 'Hello123';
        const result = validateAlpha(str, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain("String contains invalid characters for locale 'en-US'.");
    });

    it('should handle long strings with valid and invalid characters', () => {
        const options: IAlphaValidationOptions = { locale: 'en-US' };
        const str = 'HelloWorldThisIsATestString123';
        const result = validateAlpha(str, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain("String contains invalid characters for locale 'en-US'.");
    });

    it('should handle strings with special characters ignored', () => {
        const options: IAlphaValidationOptions = { locale: 'en-US', ignore: '-' };
        const str = 'Hello-World-This-Is-A-Test';
        expect(validateAlpha(str, options).isValid).toBeTruthy();
    });
});
