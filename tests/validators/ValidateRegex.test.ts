import { validateRegex } from "../../src";

describe('validateRegex', () => {
    it('should pass when the value matches the pattern', () => {
        const options = { pattern: /^[a-z]+$/, message: "Only lowercase letters are allowed." };
        const value = 'abc';
        expect(validateRegex(value, options).isValid).toBeTruthy();
    });

    it('should fail when the value does not match the pattern', () => {
        const options = { pattern: /^[a-z]+$/, message: "Only lowercase letters are allowed." };
        const value = 'abc123';
        const validationResult = validateRegex(value, options);
        expect(validationResult.isValid).toBeFalsy();
        expect(validationResult.errors).toContain("Only lowercase letters are allowed.");
    });

    it('should pass when the value does not match the pattern but invertMatch is true', () => {
        const options = { pattern: /\d+/, invertMatch: true, message: "No numbers are allowed." };
        const value = 'abc';
        expect(validateRegex(value, options).isValid).toBeTruthy();
    });

    it('should fail when the value matches the pattern and invertMatch is true', () => {
        const options = { pattern: /\d+/, invertMatch: true, message: "No numbers are allowed." };
        const value = 'abc123';
        const validationResult = validateRegex(value, options);
        expect(validationResult.isValid).toBeFalsy();
        expect(validationResult.errors).toContain("No numbers are allowed.");
    });

    it('should pass for an empty string when allowEmptyString is true', () => {
        const options = { pattern: /.+/, allowEmptyString: true };
        const value = '';
        expect(validateRegex(value, options).isValid).toBeTruthy();
    });

    it('should fail for an empty string when allowEmptyString is false', () => {
        const options = { pattern: /.+/, allowEmptyString: false, message: "Empty string is not allowed." };
        const value = '';
        const validationResult = validateRegex(value, options);
        expect(validationResult.isValid).toBeFalsy();
        expect(validationResult.errors).toContain("Empty string is not allowed.");
    });

    it('should pass when the trimmed value matches the pattern', () => {
        const options = { pattern: /^[a-z]+$/, testAgainstTrimmedValue: true };
        const value = ' abc ';
        expect(validateRegex(value, options).isValid).toBeTruthy();
    });

    it('should fail when the untrimmed value does not match the pattern but testAgainstTrimmedValue is false', () => {
        const options = { pattern: /^[a-z]+$/, testAgainstTrimmedValue: false, message: "Value must start and end with a letter." };
        const value = ' abc ';
        const validationResult = validateRegex(value, options);
        expect(validationResult.isValid).toBeFalsy();
        expect(validationResult.errors).toContain("Value must start and end with a letter.");
    });
});
