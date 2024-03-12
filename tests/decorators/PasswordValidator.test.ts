// @ts-nocheck

import { ClassValidator, Password } from "../../src";

describe('UserAccount with Password Decorator', () => {
    @ClassValidator
    class UserAccount {
        @Password({
            minLength: 8,
            maxLength: 20,
            mustContainLowercase: true,
            mustContainUppercase: true,
            mustContainNumber: true,
            mustContainSpecialCharacter: true,
            message: "Password must be 8-20 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character."
        })
        password: string;

        constructor(password: string) {
            this.password = password;
        }
}
    it('should accept a valid password with mixed characters', () => {
        expect(() => new UserAccount("ValidPass123!")).not.toThrow();
    });

    it('should reject password that is too short', () => {
        expect(() => new UserAccount("Short1!")).toThrow();
    });

    it('should reject password that is too long', () => {
        expect(() => new UserAccount("TooLongPassword12345!@#$%^&*")).toThrow();
    });

    it('should reject password without a lowercase letter', () => {
        expect(() => new UserAccount("UPPERCASE123!")).toThrow();
    });

    it('should reject password without an uppercase letter', () => {
        expect(() => new UserAccount("lowercase123!")).toThrow();
    });

    it('should reject password without a number', () => {
        expect(() => new UserAccount("NoNumber!")).toThrow();
    });

    it('should reject password without a special character', () => {
        expect(() => new UserAccount("NoSpecialChar123")).toThrow();
    });

    it('should reject a empty password', () => {
        expect(() => new UserAccount('')).toThrow();
    });

    it('should reject an empty string password', () => {
        expect(() => new UserAccount("")).toThrow();
    });

    it('should reject password with only special characters', () => {
        expect(() => new UserAccount("!!!!!!")).toThrow();
    });
});

describe('UserAccount Password Validation with Realistic Regex Pattern', () => {
    @ClassValidator
    class UserAccountWithRealisticRegex {
        @Password({
            minLength: 8,
            maxLength: 20,
            mustContainLowercase: true,
            mustContainUppercase: true,
            mustContainNumber: true,
            mustContainSpecialCharacter: true,
            regexPattern: /^[A-Za-z].*[0-9].*[^A-Za-z0-9]$/,
            message: "Password must start with a letter, include at least one digit, and end with a non-alphanumeric character."
        })
        password: string;

        constructor(password: string) {
            this.password = password;
        }
    }
    it('should accept valid password "Password9!"', () => {
        expect(() => new UserAccountWithRealisticRegex("Password9!")).not.toThrow();
    });

    it('should reject password "9Password!" not starting with a letter', () => {
        expect(() => new UserAccountWithRealisticRegex("9Password!")).toThrow();
    });

    it('should reject password "Password" missing a digit and non-alphanumeric ending', () => {
        expect(() => new UserAccountWithRealisticRegex("Password")).toThrow();
    });

    it('should reject password "password9" missing an uppercase letter and non-alphanumeric ending', () => {
        expect(() => new UserAccountWithRealisticRegex("password9")).toThrow();
    });

    it('should reject password "PASSWORD9" missing a lowercase letter', () => {
        expect(() => new UserAccountWithRealisticRegex("PASSWORD9!")).toThrow();
    });

    it('should reject password "Password!" missing a digit', () => {
        expect(() => new UserAccountWithRealisticRegex("Password!")).toThrow();
    });

    it('should reject password "Password9" not ending with a non-alphanumeric character', () => {
        expect(() => new UserAccountWithRealisticRegex("Password9")).toThrow();
    });

    it('should accept complex password "aB3$5dR!"', () => {
        expect(() => new UserAccountWithRealisticRegex("aB3$5dR!")).not.toThrow();
    });

    it('should reject overly simplistic password "Abc123!"', () => {
        // Assuming the regex or other policies enforce complexity beyond basic character presence
        expect(() => new UserAccountWithRealisticRegex("Abc123!")).toThrow();
    });

    it('should enforce minimum length', () => {
        expect(() => new UserAccountWithRealisticRegex("aB3$!")).toThrow();
    });

    it('should enforce maximum length', () => {
        expect(() => new UserAccountWithRealisticRegex("aB3$5dR!aB3$5dR!TooLong")).toThrow();
    });

    // Ensuring the password that includes all types of allowed characters and meets all specified conditions is accepted
    it('should accept password with mixed allowed characters "Abc123$%"', () => {
        expect(() => new UserAccountWithRealisticRegex("Abc123$%")).not.toThrow();
    });
});