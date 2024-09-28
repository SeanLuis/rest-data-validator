import { SchemaValidator } from "../../src";

describe('TransformSchema', () => {
  it('should apply the transformation function and then validate', () => {
    const schema = SchemaValidator.transform(SchemaValidator.string().min(3), (value: string) => value.trim());

    const resultValid = schema.validate('   John   ');
    expect(resultValid.isValid).toBe(true); // Should pass because 'John' is valid after trimming
    expect(resultValid.errors).toHaveLength(0);

    const resultInvalid = schema.validate('  Jo  ');
    expect(resultInvalid.isValid).toBe(false); // Should fail because 'Jo' is too short after trimming
    expect(resultInvalid.errors).toContain('String is too short. Minimum length is 3.');
  });

  it('should handle undefined or null values without applying transformation', () => {
    const schema = SchemaValidator.transform(
      SchemaValidator.string().nullable(true).optional(),
      (value: string) => value.trim()
    ).nullable(true).optional();

    const resultUndefined = schema.validate(undefined);
    expect(resultUndefined.isValid).toBe(true); // Should pass because undefined is allowed

    const resultNull = schema.validate(null);
    expect(resultNull.isValid).toBe(true); // Should pass because null is allowed
  });
});
