import { SchemaValidator } from "../../src";

describe('LazySchema', () => {
  it('should lazily evaluate the schema and validate correctly', () => {
    const schema = SchemaValidator.lazy(() => SchemaValidator.string().min(3));

    const resultValid = schema.validate('John');
    expect(resultValid.isValid).toBe(true); // Should pass as 'John' is a valid string with min length 3

    const resultInvalid = schema.validate('Jo');
    expect(resultInvalid.isValid).toBe(false); // Should fail as 'Jo' is less than 3 characters
    expect(resultInvalid.errors).toContain('String is too short. Minimum length is 3.');
  });

  it('should return an error if the value is null or undefined', () => {
    const schema = SchemaValidator.lazy(() => SchemaValidator.string());

    const resultNull = schema.validate(null);
    expect(resultNull.isValid).toBe(false);
    expect(resultNull.errors).toContain('Value cannot be null or undefined.');

    const resultUndefined = schema.validate(undefined);
    expect(resultUndefined.isValid).toBe(false);
    expect(resultUndefined.errors).toContain('Value cannot be null or undefined.');
  });
});
