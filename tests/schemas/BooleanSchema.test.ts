import { SchemaValidator } from "../../src";

describe('BooleanSchema', () => {

  it('should be defined', () => {
    const schema = SchemaValidator.boolean();
    expect(schema).toBeDefined();
  });

  it('should validate true as a valid boolean', () => {
    const schema = SchemaValidator.boolean();

    const validationResult = schema.validate(true);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });

  it('should validate false as a valid boolean', () => {
    const schema = SchemaValidator.boolean();

    const validationResult = schema.validate(false);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });

  it('should fail validation for non-boolean values', () => {
    const schema = SchemaValidator.boolean();

    const validationResult = schema.validate('not a boolean' as any);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toContain('Value must be a boolean.');
  });

  it('should enforce required validation correctly', () => {
    const schema = SchemaValidator.boolean().required(true);

    let validationResult = schema.validate(undefined);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toContain('Value is required.');

    validationResult = schema.validate(true);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });

});
