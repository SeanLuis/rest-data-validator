import { validateCustom } from "../../src";
import { ICustomValidationOptions } from "../../src/interfaces/ICustomValidationOptions";

describe('CustomValidator', () => {
    const customValidationOptions: ICustomValidationOptions = {
        name: 'Custom Validation',
        validate: (value: string): boolean => {
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            const isLongEnough = value.length >= 8;
            const hasUppercase = /[A-Z]/.test(value);
            const hasLowercase = /[a-z]/.test(value);
            const hasDigit = /\d/.test(value);
            const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value);
            return isValidEmail && isLongEnough && hasUppercase && hasLowercase && hasDigit && hasSpecialCharacter;
        }
    };

    it('should pass when the custom validation logic returns true', () => {
        const value = 'Test123!@example.com';
        const result = validateCustom(value, customValidationOptions);
        expect(result.isValid).toBeTruthy();
        expect(result.errors).toEqual([]);
    });

    it('should fail when the custom validation logic returns false', () => {
        const value = 'abc';
        const result = validateCustom(value, customValidationOptions);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`Custom validation '${customValidationOptions.name}' failed.`);
    });
});