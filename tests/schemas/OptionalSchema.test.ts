import { SchemaValidator } from "../../src";

describe('OptionalSchema', () => {
  it('should pass validation if the value is undefined', () => {
    const schema = SchemaValidator.optional(SchemaValidator.string());

    const result = schema.validate(undefined);
    expect(result.isValid).toBe(true); // Should pass because the value is optional
    expect(result.errors).toHaveLength(0);
  });

  it('should validate the value if it is provided', () => {
    const schema = SchemaValidator.optional(SchemaValidator.number().min(18));

    const result = schema.validate(25);
    expect(result.isValid).toBe(true); // Should pass because 25 is a valid number
    expect(result.errors).toHaveLength(0);

    const resultInvalid = schema.validate(17);
    expect(resultInvalid.isValid).toBe(false); // Should fail because 17 is below the minimum of 18
    expect(resultInvalid.errors).toContain('Number is too small. Minimum value is 18.');
  });

  it('should fail if the provided value does not match the inner schema', () => {
    const schema = SchemaValidator.optional(SchemaValidator.number());

    const result = schema.validate('not-a-number' as any);
    expect(result.isValid).toBe(false); // Should fail because 'not-a-number' is not a valid number
    expect(result.errors).toContain('Value must be a number.');
  });
});
