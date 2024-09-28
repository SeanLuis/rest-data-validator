import { SchemaValidator } from "../../src";

describe('NumberSchema', () => {
  it('should pass validation for a valid number', () => {
    const schema = SchemaValidator.number().min(10).max(20);

    const result = schema.validate(15);
    expect(result.isValid).toBe(true); // Should pass because 15 is within the range 10-20
    expect(result.errors).toHaveLength(0);
  });

  it('should fail validation if the number is below the minimum', () => {
    const schema = SchemaValidator.number().min(10);

    const result = schema.validate(5);
    expect(result.isValid).toBe(false); // Should fail because 5 is less than 10
    expect(result.errors).toContain('Number is too small. Minimum value is 10.');
  });

  it('should fail validation if the number is above the maximum', () => {
    const schema = SchemaValidator.number().max(20);

    const result = schema.validate(25);
    expect(result.isValid).toBe(false); // Should fail because 25 is greater than 20
    expect(result.errors).toContain('Number is too large. Maximum value is 20.');
  });

  it('should pass validation if the number is an integer and integer-only is set', () => {
    const schema = SchemaValidator.number().integer();

    const result = schema.validate(10);
    expect(result.isValid).toBe(true); // Should pass because 10 is an integer
  });

  it('should fail validation if the number is not an integer and integer-only is set', () => {
    const schema = SchemaValidator.number().integer();

    const result = schema.validate(10.5);
    expect(result.isValid).toBe(false); // Should fail because 10.5 is not an integer
    expect(result.errors).toContain('Number must be an integer.');
  });

  it('should fail validation for a non-number value', () => {
    const schema = SchemaValidator.number();

    const result = schema.validate('abc' as any);
    expect(result.isValid).toBe(false); // Should fail because 'abc' is not a number
    expect(result.errors).toContain('Value must be a number.');
  });
});
