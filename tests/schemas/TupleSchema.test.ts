// @ts-nocheck
import { SchemaValidator } from "../../src";

describe('TupleSchema', () => {
  it('should validate a tuple of RGB values correctly', () => {
    // Using SchemaValidator to instantiate schemas
    const schema = SchemaValidator.tuple([
      SchemaValidator.number().min(0).max(255), 
      SchemaValidator.number().min(0).max(255), 
      SchemaValidator.number().min(0).max(255)
    ]);

    const resultValid = schema.validate([255, 100, 50]);
    expect(resultValid.isValid).toBe(true); // Should pass as all values are valid RGB numbers
    expect(resultValid.errors).toHaveLength(0);

    const resultInvalid = schema.validate([256, 100, 50]);
    expect(resultInvalid.isValid).toBe(false); // Should fail because 256 is out of range
    expect(resultInvalid.errors).toContain('Validation failed for tuple element at index 0: Number is too large. Maximum value is 255.');
  });

  it('should fail validation if the tuple has an incorrect length', () => {
    // Using SchemaValidator to instantiate schemas
    const schema = SchemaValidator.tuple([
      SchemaValidator.number(), 
      SchemaValidator.number(), 
      SchemaValidator.number()
    ]);

    const resultTooShort = schema.validate([100, 50]);
    expect(resultTooShort.isValid).toBe(false); // Should fail because the tuple has only 2 elements
    expect(resultTooShort.errors).toContain('Tuple must have exactly 3 elements.');

    const resultTooLong = schema.validate([100, 50, 30, 20]);
    expect(resultTooLong.isValid).toBe(false); // Should fail because the tuple has more than 3 elements
    expect(resultTooLong.errors).toContain('Tuple must have exactly 3 elements.');
  });
});
