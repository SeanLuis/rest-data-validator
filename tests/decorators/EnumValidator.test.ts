import { ClassValidator, Enum } from "../../src";

enum UserRole {
    Admin = 'ADMIN',
    User = 'USER',
    Guest = 'GUEST'
}

@ClassValidator
class User {
    @Enum<UserRole>({ enum: Object.values(UserRole), message: "Invalid role" })
    role: UserRole;

    constructor(role: UserRole) {
        this.role = role;
    }
}

describe('User with Enum Decorator', () => {
  it.each(Object.values(UserRole))('should create an instance without throwing errors for a valid role %s', (validRole) => {
    expect(() => new User(validRole)).not.toThrow();
  });

  const invalidRoles = ["SUPER_ADMIN", "", null, undefined, 123];
  it.each(invalidRoles)('should throw an error for an invalid role %s', (invalidRole) => {
      expect(() => new User(invalidRole as any)).toThrow('Validation failed:');
  });

  it('should throw a default error message for an invalid role when no custom message is provided', () => {
      @ClassValidator
      class UserWithoutCustomMessage {
          @Enum<UserRole>({ enum: Object.values(UserRole) })
          role: UserRole;

          constructor(role: UserRole) {
              this.role = role;
          }
      }

      expect(() => new UserWithoutCustomMessage("INVALID_ROLE" as any)).toThrow('Validation failed:');
  });

  it('should throw an error for null or undefined role', () => {
      expect(() => new User(null as any)).toThrow('Validation failed:');
      expect(() => new User(undefined as any)).toThrow('Validation failed:');
  });
});


