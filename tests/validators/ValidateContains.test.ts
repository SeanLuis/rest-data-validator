import { validateContains } from "../../src";
import { IContainsValidationOptions } from "../../src/interfaces/IContainsValidationOptions";

describe('validateContains', () => {
    it('should pass when the string contains the seed', () => {
        const options: IContainsValidationOptions = { seed: 'test' };
        const str = 'This is a test string';
        expect(validateContains(str, options).isValid).toBeTruthy();
    });

    it('should fail when the string does not contain the seed', () => {
        const options: IContainsValidationOptions = { seed: 'test' };
        const str = 'This is a string';
        const result = validateContains(str, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain("String does not contain the seed 'test' at least 1 times.");
    });

    it('should be case sensitive by default', () => {
        const options: IContainsValidationOptions = { seed: 'test' };
        const str = 'This is a Test string';
        const result = validateContains(str, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain("String does not contain the seed 'test' at least 1 times.");
    });

    it('should respect the ignoreCase option', () => {
        const options: IContainsValidationOptions = { seed: 'test', ignoreCase: true };
        const str = 'This is a Test string';
        expect(validateContains(str, options).isValid).toBeTruthy();
    });

    it('should respect the minOccurrences option', () => {
        const options: IContainsValidationOptions = { seed: 'test', minOccurrences: 2 };
        const str = 'This is a test string with another test';
        expect(validateContains(str, options).isValid).toBeTruthy();
    });

    it('should fail if the occurrences are less than minOccurrences', () => {
        const options: IContainsValidationOptions = { seed: 'test', minOccurrences: 2 };
        const str = 'This is a test string';
        const result = validateContains(str, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain("String does not contain the seed 'test' at least 2 times.");
    });

    it('should handle long strings with multiple occurrences of the seed', () => {
        const options: IContainsValidationOptions = { seed: 'lorem', minOccurrences: 5 };
        const str = 'Lorem ipsum dolor sit amet, lorem ipsum dolor lorem sit amet, lorem lorem lorem';
        const result = validateContains(str, options);
        expect(result.isValid).toBeTruthy();
    });

    it('should fail for long strings without enough occurrences of the seed', () => {
        const options: IContainsValidationOptions = { seed: 'lorem', minOccurrences: 5 };
        const str = 'Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet';
        const result = validateContains(str, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain("String does not contain the seed 'lorem' at least 5 times.");
    });

    it('should handle strings with special characters', () => {
        const options: IContainsValidationOptions = { seed: 'special!', minOccurrences: 3 };
        const str = 'This special! string contains special! characters like special! marks';
        const result = validateContains(str, options);
        expect(result.isValid).toBeTruthy();
    });

    it('should use the default error message if none is provided', () => {
        const options: IContainsValidationOptions = { seed: 'test' };
        const str = 'This is a string';
        const result = validateContains(str, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain("String does not contain the seed 'test' at least 1 times.");
    });
});
