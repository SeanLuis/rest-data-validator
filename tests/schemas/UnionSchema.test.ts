import { SchemaValidator } from "../../src";

describe('UnionSchema', () => {
  it('should validate if the value matches any of the provided schemas', () => {
    const schema = SchemaValidator.union([
      SchemaValidator.string(),
      SchemaValidator.number(),
    ]);

    const resultValidString = schema.validate('John');
    expect(resultValidString.isValid).toBe(true); // Should pass as 'John' is a valid string
    expect(resultValidString.errors).toHaveLength(0);

    const resultValidNumber = schema.validate(42);
    expect(resultValidNumber.isValid).toBe(true); // Should pass as 42 is a valid number
    expect(resultValidNumber.errors).toHaveLength(0);
  });

  it('should fail validation if the value does not match any of the schemas', () => {
    const schema = SchemaValidator.union([
      SchemaValidator.string(),
      SchemaValidator.number(),
    ]);

    const resultInvalid = schema.validate(true);
    expect(resultInvalid.isValid).toBe(false); // Should fail because boolean is neither a string nor a number
    expect(resultInvalid.errors).toContain('Value does not match any of the allowed types.');
  });

  it('should work with complex types like object or array schemas', () => {
    const schema = SchemaValidator.union([
      SchemaValidator.object({
        name: SchemaValidator.string(),
        age: SchemaValidator.number(),
      }),
      SchemaValidator.array(SchemaValidator.string()),
    ]);
  
    const resultValidObject = schema.validate({ name: 'John', age: 30 });
    expect(resultValidObject.isValid).toBe(true); // Should pass as the object matches the first schema
    expect(resultValidObject.errors).toHaveLength(0);
  
    const resultValidArray = schema.validate(['apple', 'banana']);
    expect(resultValidArray.isValid).toBe(true); // Should pass as the array matches the second schema
    expect(resultValidArray.errors).toHaveLength(0);
  
    const resultInvalid = schema.validate(42);
    expect(resultInvalid.isValid).toBe(false); // Should fail because 42 doesn't match either schema
    expect(resultInvalid.errors).toContain('Value does not match any of the allowed types.');
  });

  it('should validate nested union schemas', () => {
    const schema = SchemaValidator.union([
      SchemaValidator.string(),
      SchemaValidator.union([
        SchemaValidator.number(),
        SchemaValidator.boolean(),
      ]),
    ]);

    const resultValidString = schema.validate('Hello');
    expect(resultValidString.isValid).toBe(true); // Should pass as 'Hello' is a valid string

    const resultValidNumber = schema.validate(42);
    expect(resultValidNumber.isValid).toBe(true); // Should pass as 42 is a valid number

    const resultValidBoolean = schema.validate(true);
    expect(resultValidBoolean.isValid).toBe(true); // Should pass as true is a valid boolean

    const resultInvalid = schema.validate({});
    expect(resultInvalid.isValid).toBe(false); // Should fail as an empty object matches neither schema
    expect(resultInvalid.errors).toContain('Value does not match any of the allowed types.');
  });
});
