import { ClassValidator, Email, String } from "../../src";

@ClassValidator
class UserProfile {
    @String({
        minLength: 2,
        maxLength: 5
    })
    username: string;

    @Email()
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

    it('should reject invalid email formats with special characters and white spaces', () => {
        expect(() => new UserProfile("John", "john doe@example.com")).toThrow();
        expect(() => new UserProfile("John", "john<doe>@example.com")).toThrow();
    });

    it('should reject invalid email formats with incorrect local part', () => {
        expect(() => new UserProfile("John", "john..doe@example.com")).toThrow();
        expect(() => new UserProfile("John", "john.@example.com")).toThrow();
        expect(() => new UserProfile("John", ".john@example.com")).toThrow();
    });

    it('should reject invalid email formats with incorrect domain', () => {
        expect(() => new UserProfile("John", "john@example..com")).toThrow();
        expect(() => new UserProfile("John", "john@example-.com")).toThrow();
        expect(() => new UserProfile("John", "john@-example.com")).toThrow();
    });

    it('should reject email addresses without the @ character', () => {
        expect(() => new UserProfile("John", "johndoeexample.com")).toThrow();
    });

    it('should reject email addresses with invalid or nonexistent top-level domains', () => {
        expect(() => new UserProfile("John", "john@example.c")).toThrow();
        expect(() => new UserProfile("John", "john@example.123")).toThrow();
    });

    it('should reject email addresses missing parts', () => {
        expect(() => new UserProfile("John", "@example.com")).toThrow();
        expect(() => new UserProfile("John", "john@")).toThrow();
    });

    it('should reject overly long email addresses', () => {
        expect(() => new UserProfile("John", "johndoe@example.commmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")).toThrow();
    });

    it('should reject email addresses with invalid domain characters', () => {
        expect(() => new UserProfile("John", "john@example!com")).toThrow();
        expect(() => new UserProfile("John", "john@example&domain")).toThrow();
    });

    it('should reject email addresses with incorrect subdomain formats', () => {
        expect(() => new UserProfile("John", "john@subdomain..example.com")).toThrow();
        expect(() => new UserProfile("John", "john@.subdomain.example.com")).toThrow();
    });

    it('should reject email addresses that include URLs or protocols', () => {
        expect(() => new UserProfile("John", "john@http://example.com")).toThrow();
        expect(() => new UserProfile("John", "john@example.com/path/to/file")).toThrow();
    });

    it('should reject email addresses with multiple @ signs', () => {
        expect(() => new UserProfile("John", "john@@example.com")).toThrow();
        expect(() => new UserProfile("John", "jo@hn@example.com")).toThrow();
    });

    it('should reject email addresses with overly long local parts', () => {
        expect(() => new UserProfile("John", `${'a'.repeat(65)}@example.com`)).toThrow();
    });

    it('should reject email addresses with quotes or parentheses in inappropriate places', () => {
        expect(() => new UserProfile("John", `"john"@example.com`)).toThrow();
        expect(() => new UserProfile("John", "john(doe)@example.com")).toThrow();
    });


});

