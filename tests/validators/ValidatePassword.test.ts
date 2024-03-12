import { validatePassword } from "../../src";
import { IPasswordValidationOptions } from "../../src/interfaces/IPasswordValidationOptions";

describe('validatePassword', () => {
    it('should pass with a password that meets all criteria', () => {
        const options: IPasswordValidationOptions = {
            minLength: 8,
            maxLength: 12,
            mustContainLowercase: true,
            mustContainUppercase: true,
            mustContainNumber: true,
            mustContainSpecialCharacter: true,
            regexPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/
        };
        const value = 'Abc123!@';
        expect(validatePassword(value, options).isValid).toBeTruthy();
    });

    it('should fail if the password is too short', () => {
        const options: IPasswordValidationOptions = {
            minLength: 8
        };
        const value = 'Abc12!';
        const result = validatePassword(value, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`Password is too short. Minimum length is ${options.minLength}.`);
    });

    it('should fail if the password is too long', () => {
        const options: IPasswordValidationOptions = {
            maxLength: 12
        };
        const value = 'Abc123!@Abcde';
        const result = validatePassword(value, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`Password is too long. Maximum length is ${options.maxLength}.`);
    });

    it('should fail if the password does not meet complexity requirements', () => {
        const options: IPasswordValidationOptions = {
            mustContainLowercase: true,
            mustContainUppercase: true,
            mustContainNumber: true,
            mustContainSpecialCharacter: true
        };
        const value = 'abcdef'; // No uppercase, numbers, or special characters
        const result = validatePassword(value, options);
        expect(result.isValid).toBeFalsy();

        if(result.errors)
            expect(result.errors.length).toBeGreaterThan(0); // Expect multiple error messages
    });

    it('should pass for passwords that exactly match the maxLength', () => {
        const options: IPasswordValidationOptions = {
            maxLength: 12
        };
        const value = 'Abc123!@Abcd';
        expect(validatePassword(value, options).isValid).toBeTruthy();
    });

    it('should pass for passwords that exactly match the minLength', () => {
        const options: IPasswordValidationOptions = {
            minLength: 8
        };
        const value = 'Abc1!@ab';
        expect(validatePassword(value, options).isValid).toBeTruthy();
    });

    // Additional test case for regex pattern validation
    it('should fail if the password does not match the regex pattern', () => {
        const options: IPasswordValidationOptions = {
            regexPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/
        };
        const value = 'Abcdefgh'; // No number or special character
        const result = validatePassword(value, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain('Password does not match the required pattern.');
    });
});
