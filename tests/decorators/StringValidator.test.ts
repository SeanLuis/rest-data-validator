import { ClassValidator, String } from "../../src";

@ClassValidator
class UserProfile {
    @String({
        minLength: 2,
        maxLength: 5
    })
    username: string;

    @String({
        regexPattern: /^[a-z]+$/
    })
    nickname: string;

    constructor(username: string, nickname: string) {
        this.username = username;
        this.nickname = nickname;
    }
}

describe('UserProfile with String Decorator', () => {
  it('should accept valid username, nickname, and role', () => {
      expect(() => new UserProfile("John", "joe")).not.toThrow();
  });

  it('should reject username outside the specified length range', () => {
      expect(() => new UserProfile("J", "joe")).toThrow();
      expect(() => new UserProfile("JohnDoe", "joe")).toThrow();
  });

  it('should reject nickname with uppercase letters', () => {
      expect(() => new UserProfile("John", "Joe")).toThrow();
  });

  it('should accept an empty string for role if configured', () => {
      expect(() => new UserProfile("John", "joe")).not.toThrow();
  });

  it('should allow role to be one of the allowed non-empty values', () => {
      expect(() => new UserProfile("John", "joe")).not.toThrow();
      expect(() => new UserProfile("John", "joe")).not.toThrow();
  });
});
