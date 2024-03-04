import { validateCustom } from "../../src";
import { ICustomValidationOptions } from "../../src/interfaces/ICustomValidationOptions";

describe('Validators', () => {
    // CustomValidator
    const customValidationOptions: ICustomValidationOptions = {
        name: 'Custom Validation',
        validate: (value: string): boolean => {
            const isLongEnough = value.length >= 8;
            const hasUppercase = /[A-Z]/.test(value);
            const hasLowercase = /[a-z]/.test(value);
            const hasDigit = /\d/.test(value);
            const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value);
            return isLongEnough && hasUppercase && hasLowercase && hasDigit && hasSpecialCharacter;
        }
    };

    it('should pass when all validations return true', () => {
        const value = 'Test123!@example.com';
        const customResult = validateCustom(value, customValidationOptions);
        expect(customResult.isValid).toBeTruthy();
    });

    it('should fail when any validation returns false', () => {
        const value = 'abc';
        const customResult = validateCustom(value, customValidationOptions);
        expect(customResult.isValid).toBeFalsy();
    });
});