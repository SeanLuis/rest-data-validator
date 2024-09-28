import { SchemaValidator } from "../../src";

describe('EnumSchema', () => {

  it('should be defined', () => {
    const schema = SchemaValidator.enum(['red', 'green', 'blue']);
    expect(schema).toBeDefined();
  });

  it('should validate a value that is part of the enum', () => {
    const schema = SchemaValidator.enum(['red', 'green', 'blue']);

    const validationResult = schema.validate('green');
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });

  it('should fail validation for a value not in the enum', () => {
    const schema = SchemaValidator.enum(['red', 'green', 'blue']);

    const validationResult = schema.validate('yellow');
    expect(validationResult.isValid).toBe(false); // Should be false because 'yellow' is not in the enum
    expect(validationResult.errors).toContain('Value must be one of the following: red, green, blue');
  });

  it('should validate numbers in an enum correctly', () => {
    const schema = SchemaValidator.enum([1, 2, 3]);

    const validationResult = schema.validate(2);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });

  it('should fail validation if a number not in the enum is provided', () => {
    const schema = SchemaValidator.enum([1, 2, 3]);

    const validationResult = schema.validate(4);
    expect(validationResult.isValid).toBe(false); // Should be false because 4 is not in the enum
    expect(validationResult.errors).toContain('Value must be one of the following: 1, 2, 3');
  });

  it('should enforce required validation correctly', () => {
    const schema = SchemaValidator.enum(['red', 'green', 'blue']).required(true);

    let validationResult = schema.validate(undefined);
    expect(validationResult.isValid).toBe(false); // Should be false because the value is undefined
    expect(validationResult.errors).toContain('Value is required.');

    validationResult = schema.validate('red');
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });

});
