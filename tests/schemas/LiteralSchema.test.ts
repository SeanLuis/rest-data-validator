// @ts-nocheck
import { SchemaValidator } from "../../src";

describe('LiteralSchema', () => {
  it('should validate literal values correctly', () => {
    const schema = SchemaValidator.literal('John');

    const resultValid = schema.validate('John');
    expect(resultValid.isValid).toBe(true); // Should pass because 'John' matches the literal value

    const resultInvalid = schema.validate('Doe');
    expect(resultInvalid.isValid).toBe(false); // Should fail because 'Doe' is not equal to 'John'
    expect(resultInvalid.errors).toContain('Value must be exactly John.');
  });

  it('should handle numbers as literals', () => {
    const schema = SchemaValidator.literal(42);

    const resultValid = schema.validate(42);
    expect(resultValid.isValid).toBe(true); // Should pass as the number matches the literal

    const resultInvalid = schema.validate(43);
    expect(resultInvalid.isValid).toBe(false); // Should fail because the number doesn't match
    expect(resultInvalid.errors).toContain('Value must be exactly 42.');
  });

  it('should handle booleans as literals', () => {
    const schema = SchemaValidator.literal(true);

    const resultValid = schema.validate(true);
    expect(resultValid.isValid).toBe(true); // Should pass because the value matches the literal

    const resultInvalid = schema.validate(false);
    expect(resultInvalid.isValid).toBe(false); // Should fail because the value doesn't match
    expect(resultInvalid.errors).toContain('Value must be exactly true.');
  });
});
