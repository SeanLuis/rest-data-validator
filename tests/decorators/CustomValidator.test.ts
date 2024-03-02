import { ClassValidator, Custom } from "../../src";
import { ICustomValidationOptions } from "../../src/interfaces/ICustomValidationOptions";

const customValidationOptions1: ICustomValidationOptions = {
    name: 'LengthCheck',
    validate: (value: any) => value.length >= 8 // Length validation
};

const customValidationOptions2: ICustomValidationOptions = {
    name: 'UppercaseCheck',
    validate: (value: any) => /[A-Z]/.test(value) // Uppercase letter check
};

const customValidationOptions3: ICustomValidationOptions = {
    name: 'LowercaseCheck',
    validate: (value: any) => /[a-z]/.test(value) // Lowercase letter check
};

const customValidationOptions4: ICustomValidationOptions = {
    name: 'DigitCheck',
    validate: (value: any) => /\d/.test(value) // Digit check
};

const customValidationOptions5: ICustomValidationOptions = {
    name: 'SpecialCharacterCheck',
    validate: (value: any) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value) // Special character check
};

@ClassValidator
class User {
    @Custom(customValidationOptions1)
    @Custom(customValidationOptions2)
    @Custom(customValidationOptions3)
    @Custom(customValidationOptions4)
    @Custom(customValidationOptions5)
    password: string;

    constructor(password: string) {
        this.password = password;
    }
}

describe('User with Custom Decorators', () => {
    it('should create an instance without throwing errors for valid password', () => {
        expect(() => new User('Abc123!@')).not.toThrow();
    });

    it('should throw an error for an invalid password', () => {
        expect(() => new User('abc')).toThrow('Validation failed:');
    });
});