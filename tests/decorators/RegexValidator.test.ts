import { ClassValidator, RegexValidator } from "../../src";

@ClassValidator
class UserWithEmptyEmailAllowed {
    @RegexValidator({
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email format",
        allowEmptyString: true
    })
    email: string;

    constructor(email: string) {
        this.email = email;
    }
}

@ClassValidator
class UserWithEmptyEmailNotAllowed {
    @RegexValidator({
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email format",
        allowEmptyString: false
    })
    email: string;

    constructor(email: string) {
        this.email = email;
    }
}

describe('User with RegexValidator Decorator', () => {
  it('should accept a valid email for UserWithEmptyEmailNotAllowed', () => {
      expect(() => new UserWithEmptyEmailNotAllowed('user@example.com')).not.toThrow();
  });

  it('should reject an invalid email for UserWithEmptyEmailNotAllowed', () => {
      expect(() => new UserWithEmptyEmailNotAllowed('invalid-email')).toThrow('Invalid email format');
  });

  it('should reject empty string for UserWithEmptyEmailNotAllowed', () => {
      expect(() => new UserWithEmptyEmailNotAllowed('')).toThrow('Invalid email format');
  });
});

describe('UserWithEmptyEmailAllowed with RegexValidator Decorator', () => {
  it('should accept a valid email', () => {
      expect(() => new UserWithEmptyEmailAllowed('user@example.com')).not.toThrow();
  });

  it('should accept an empty string when configured', () => {
      expect(() => new UserWithEmptyEmailAllowed('')).not.toThrow();
  });
});

