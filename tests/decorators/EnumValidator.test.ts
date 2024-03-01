import { ClassValidator, EnumValidator } from "../../src";

enum UserRole {
    Admin = 'ADMIN',
    User = 'USER',
    Guest = 'GUEST'
}

@ClassValidator
class User {
    @EnumValidator<UserRole>({ enum: Object.values(UserRole), message: "Invalid role" })
    role: UserRole;

    constructor(role: UserRole) {
        this.role = role;
    }
}

describe('User with EnumValidator Decorator', () => {
  // Prueba para un valor válido
  it.each(Object.values(UserRole))('should create an instance without throwing errors for a valid role %s', (validRole) => {
    expect(() => new User(validRole)).not.toThrow();
  });

  // Pruebas para valores inválidos
  const invalidRoles = ["SUPER_ADMIN", "", null, undefined, 123];
  it.each(invalidRoles)('should throw an error for an invalid role %s', (invalidRole) => {
      // "as any" se utiliza aquí para simular un valor fuera del enum; en uso real, TypeScript prevendría esto
      expect(() => new User(invalidRole as any)).toThrow('Validation failed:');
  });

  // Prueba sin proporcionar mensaje personalizado
  it('should throw a default error message for an invalid role when no custom message is provided', () => {
      // Simula no proporcionar un mensaje personalizado en las opciones
      @ClassValidator
      class UserWithoutCustomMessage {
          @EnumValidator<UserRole>({ enum: Object.values(UserRole) })
          role: UserRole;

          constructor(role: UserRole) {
              this.role = role;
          }
      }

      expect(() => new UserWithoutCustomMessage("INVALID_ROLE" as any)).toThrow('Validation failed:');
  });

  // Prueba para verificar el comportamiento con un valor nulo o indefinido cuando esos valores no están permitidos por el enum
  it('should throw an error for null or undefined role', () => {
      expect(() => new User(null as any)).toThrow('Validation failed:');
      expect(() => new User(undefined as any)).toThrow('Validation failed:');
  });
});


