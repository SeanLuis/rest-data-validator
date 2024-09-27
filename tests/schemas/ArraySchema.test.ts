import { SchemaValidator } from "../../src";

describe('ArraySchema', () => {
  
  it('should be defined', () => {
    const schema = SchemaValidator.array(SchemaValidator.string());
    expect(schema).toBeDefined();
  });

  it('should validate an array of strings correctly', () => {
    const schema = SchemaValidator.array(SchemaValidator.string());

    const validationResult = schema.validate(['apple', 'banana', 'cherry']);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });

  it('should fail validation if an array contains non-string elements', () => {
    const schema = SchemaValidator.array(SchemaValidator.string());

    const validationResult = schema.validate(['apple', 123 as any, 'cherry']);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toHaveLength(1);
  });

  it('should enforce minimum array length', () => {
    const schema = SchemaValidator.array(SchemaValidator.string()).min(3);

    const validationResult = schema.validate(['apple']);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toContain('Array is too short. Minimum length is 3.');
  });

  it('should enforce maximum array length', () => {
    const schema = SchemaValidator.array(SchemaValidator.string()).max(2);

    const validationResult = schema.validate(['apple', 'banana', 'cherry']);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toContain('Array is too long. Maximum length is 2.');
  });

  it('should validate nested array schemas', () => {
    const schema = SchemaValidator.array(SchemaValidator.array(SchemaValidator.string()));

    const validationResult = schema.validate([['apple', 'banana'], ['cherry', 'date']]);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });

});
