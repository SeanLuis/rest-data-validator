import { ClassValidator, Email, String } from "../../src";

@ClassValidator
class UserProfile {
    @String({
        minLength: 2,
        maxLength: 5
    })
    username: string;

    @Email({})
    email: string;

    constructor(username: string,  email: string) {
        this.username = username;
        this.email = email;
    }
}

describe('UserProfile with Email Decorator', () => {
    it('should accept valid email', () => {
        expect(() => new UserProfile("John", "john@example.com")).not.toThrow();
        expect(() => new UserProfile("John", "john@example.co.com")).not.toThrow();
    });

    it('should reject invalid email formats', () => {
        expect(() => new UserProfile("John","john@example..com")).toThrow();
        expect(() => new UserProfile("John","not-an-email")).toThrow();
        expect(() => new UserProfile("John","@example.com")).toThrow();
        expect(() => new UserProfile("John","john@example")).toThrow();
        expect(() => new UserProfile("John","john@.com")).toThrow();
        expect(() => new UserProfile("John","john@.com.")).toThrow();
    });
});

