// @ts-nocheck
import { SchemaValidator } from "../../src";

describe('RecordSchema', () => {
  it('should validate a record of string keys and boolean values', () => {
    const schema = SchemaValidator.record(SchemaValidator.string(), SchemaValidator.boolean());

    const validRecord = {
      darkMode: true,
      notifications: false,
    };

    const resultValid = schema.validate(validRecord);
    expect(resultValid.isValid).toBe(true); // Should pass as all keys are strings and values are booleans
    expect(resultValid.errors).toHaveLength(0);
  });

  it('should fail validation if the key is invalid', () => {
    const schema = SchemaValidator.record(SchemaValidator.string().min(3), SchemaValidator.boolean());

    const invalidRecord = {
      on: true, // Key 'on' is too short
    };

    const result = schema.validate(invalidRecord);
    expect(result.isValid).toBe(false); // Should fail because 'on' is less than 3 characters
    expect(result.errors).toContain("Invalid key 'on': String is too short. Minimum length is 3.");
  });

  it('should fail validation if a value does not match the value schema', () => {
    const schema = SchemaValidator.record(SchemaValidator.string(), SchemaValidator.boolean());

    const invalidRecord = {
      darkMode: 'yes', // Invalid boolean value
    };

    const result = schema.validate(invalidRecord);
    expect(result.isValid).toBe(false); // Should fail because 'yes' is not a boolean
    expect(result.errors).toContain("Invalid value for key 'darkMode': Value must be a boolean.");
  });

  it('should fail validation if the record is not an object', () => {
    const schema = SchemaValidator.record(SchemaValidator.string(), SchemaValidator.boolean());

    const result = schema.validate(null);
    expect(result.isValid).toBe(false); // Should fail because the value is not a record
    expect(result.errors).toContain('Value cannot be null.');
  });
});
