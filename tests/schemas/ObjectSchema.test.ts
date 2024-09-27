import { SchemaValidator } from "../../src";

describe('ObjectSchema', () => {
  it('should validate a simple object schema', () => {
    const schema = SchemaValidator.object({
      name: SchemaValidator.string(),
      age: SchemaValidator.number()
    });

    const result = schema.validate({ name: 'John', age: 30 });
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail validation if a required property is missing', () => {
    const schema = SchemaValidator.object({
      name: SchemaValidator.string(),
      age: SchemaValidator.number()
    });
  
    const result = schema.validate({ name: 'John' });
    expect(result.isValid).toBe(false); // Should be false because 'age' is missing
    expect(result.errors).toContain("Validation failed for property 'age': Property is missing.");
  });

  it('should validate a nested object schema', () => {
    const schema = SchemaValidator.object({
      user: SchemaValidator.object({
        name: SchemaValidator.string(),
        age: SchemaValidator.number(),
        address: SchemaValidator.object({
          street: SchemaValidator.string(),
          city: SchemaValidator.string(),
          zipCode: SchemaValidator.number()
        })
      })
    });

    const result = schema.validate({
      user: {
        name: 'John',
        age: 30,
        address: {
          street: '123 Main St',
          city: 'Anytown',
          zipCode: 12345
        }
      }
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail validation if a nested required property is missing', () => {
    const schema = SchemaValidator.object({
      user: SchemaValidator.object({
        name: SchemaValidator.string(),
        age: SchemaValidator.number(),
        address: SchemaValidator.object({
          street: SchemaValidator.string(),
          city: SchemaValidator.string(),
          zipCode: SchemaValidator.number()
        })
      })
    });

    const result = schema.validate({
      user: {
        name: 'John',
        age: 30,
        address: {
          street: '123 Main St',
          // Missing city
          // Missing zipCode
        }
      }
    });

    expect(result.isValid).toBe(false); // Should be false because 'zipCode' is missing
    expect(result.errors).toContain("Validation failed for property 'user': Validation failed for property 'address': Validation failed for property 'city': Property is missing.");
    expect(result.errors).toContain("Validation failed for property 'user': Validation failed for property 'address': Validation failed for property 'zipCode': Property is missing.");
  });

  it('should fail validation if a property has the wrong type', () => {
    const schema = SchemaValidator.object({
      name: SchemaValidator.string(),
      age: SchemaValidator.number()
    });
    
    const result = schema.validate({ name: 'John', age: 'thirty' }); // 'age' should be a number, not a string
    expect(result.isValid).toBe(false); // Should be false because 'age' has the wrong type
    expect(result.errors).toContain("Validation failed for property 'age': Value must be a number.");
  });

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

  it('should validate an object with additional properties', () => {
    const schema = SchemaValidator.object({
      name: SchemaValidator.string(),
      age: SchemaValidator.number()
    });

    const result = schema.validate({ name: 'John', age: 30, country: 'USA' });
    expect(result.isValid).toBe(true); // Should be true even with additional properties not defined in the schema
    expect(result.errors).toHaveLength(0);
  });
});
