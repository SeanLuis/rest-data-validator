import { SchemaValidator } from "../../src";

describe('ObjectSchema with optional properties', () => {
  it('should validate an object with optional properties', () => {
    const schema = SchemaValidator.object({
      name: SchemaValidator.string(),
      age: SchemaValidator.number(),
      email: SchemaValidator.string().optional()
    });

    const result = schema.validate({ name: 'John', age: 30 });
    expect(result.isValid).toBe(true); // Should be true because 'email' is optional
    expect(result.errors).toHaveLength(0);
  });

  it('should fail validation if an optional property is present but invalid', () => {
    const schema = SchemaValidator.object({
      name: SchemaValidator.string(),
      age: SchemaValidator.number(),
      email: SchemaValidator.string().optional()
    });

    const result = schema.validate({ name: 'John', age: 30, email: 123 });
    expect(result.isValid).toBe(false); // Should be false because 'email' is not a string
    expect(result.errors).toContain("Validation failed for property 'email': Value must be a string.");
  });
});
