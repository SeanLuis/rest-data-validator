import { SchemaValidator } from "../../src";

describe('NullableSchema', () => {
  it('should allow null values and pass validation', () => {
    const schema = SchemaValidator.nullable(SchemaValidator.number());

    const result = schema.validate(null);
    expect(result.isValid).toBe(true); // Should pass because null is allowed
    expect(result.errors).toHaveLength(0);
  });

  it('should pass validation for a valid number', () => {
    const schema = SchemaValidator.nullable(SchemaValidator.number().min(10));

    const result = schema.validate(15);
    expect(result.isValid).toBe(true); // Should pass because 15 is valid and greater than 10
    expect(result.errors).toHaveLength(0);
  });

  it('should fail validation for an invalid number', () => {
    const schema = SchemaValidator.nullable(SchemaValidator.number().min(10));

    const result = schema.validate(5);
    expect(result.isValid).toBe(false); // Should fail because 5 is less than the minimum value of 10
    expect(result.errors).toContain('Number is too small. Minimum value is 10.');
  });
});
