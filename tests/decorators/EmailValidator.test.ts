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

@ClassValidator
class UserProfileWithCustomRegex {
    @String({
        minLength: 2,
        maxLength: 5
    })
    username: string;

    @Email({regexPattern: RegExp( "^[a-zA-Z0-9_'^&/+-]{1,64}(?:\\.[a-zA-Z0-9_'^&/+-]{1,64})*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,24}$")})
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

describe('UserProfileWithCustomRegex Email Validation', () => {
    it('should accept valid emails with different domain lengths', () => {
        expect(() => new UserProfileWithCustomRegex("Jane", "jane@example.com")).not.toThrow();
        expect(() => new UserProfileWithCustomRegex("Jane", "jane@ex.co")).not.toThrow();
    });

    it('should accept valid email with numeric, hyphen, and underscore characters', () => {
        expect(() => new UserProfileWithCustomRegex("Jane", "jane_doe123@example-domain.com")).not.toThrow();
        expect(() => new UserProfileWithCustomRegex("Jane", "123_jane@domain.co")).not.toThrow();
    });

    it('should reject invalid email formats without TLD', () => {
        expect(() => new UserProfileWithCustomRegex("Jane", "jane@example")).toThrow();
        expect(() => new UserProfileWithCustomRegex("Jane", "jane@domain")).toThrow();
    });

    it('should reject invalid email formats with incorrect TLD', () => {
        expect(() => new UserProfileWithCustomRegex("Jane", "jane@example.c")).toThrow();
        expect(() => new UserProfileWithCustomRegex("Jane", "jane@domain.12")).toThrow();
    });

    it('should reject invalid email with special characters in domain', () => {
        expect(() => new UserProfileWithCustomRegex("Jane", "jane@example!.com")).toThrow();
        expect(() => new UserProfileWithCustomRegex("Jane", "jane@domain$.com")).toThrow();
    });

    it('should reject invalid email formats with consecutive dots', () => {
        expect(() => new UserProfileWithCustomRegex("Jane", "jane..doe@example.com")).toThrow();
        expect(() => new UserProfileWithCustomRegex("Jane", "jane@..domain.com")).toThrow();
    });

    it('should reject email addresses starting or ending with a dot', () => {
        expect(() => new UserProfileWithCustomRegex("Jane", ".jane@example.com")).toThrow();
        expect(() => new UserProfileWithCustomRegex("Jane", "jane.@example.com")).toThrow();
    });

    it('should reject email addresses with spaces', () => {
        expect(() => new UserProfileWithCustomRegex("Jane", "jane doe@example.com")).toThrow();
        expect(() => new UserProfileWithCustomRegex("Jane", "jane@exa mple.com")).toThrow();
    });

    it('should reject email addresses with invalid characters in local part', () => {
        expect(() => new UserProfileWithCustomRegex("Jane", "jane*doe@example.com")).toThrow();
        expect(() => new UserProfileWithCustomRegex("Jane", "jane?doe@example.com")).toThrow();
    });
});


