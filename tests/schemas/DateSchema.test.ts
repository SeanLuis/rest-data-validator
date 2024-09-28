import { SchemaValidator } from "../../src";

describe('DateSchema', () => {

  it('should be defined', () => {
    const schema = SchemaValidator.date();
    expect(schema).toBeDefined();
  });

  it('should validate a valid Date object correctly', () => {
    const schema = SchemaValidator.date();

    const validationResult = schema.validate(new Date());
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });

  it('should fail validation for non-Date objects', () => {
    const schema = SchemaValidator.date();

    const validationResult = schema.validate('not a date' as any);
    expect(validationResult.isValid).toBe(false); // Should be false because the value is not a Date object
    expect(validationResult.errors).toContain('Value must be a valid date.');
  });

  it('should enforce a minimum date', () => {
    const minDate = new Date('2022-01-01');
    const schema = SchemaValidator.date().min(minDate);

    const validationResult = schema.validate(new Date('2021-12-31'));
    expect(validationResult.isValid).toBe(false); // Should be false because the date is before the minimum
    expect(validationResult.errors).toContain(`Date must be after ${minDate.toISOString()}.`);
  });

  it('should enforce a maximum date', () => {
    const maxDate = new Date('2022-12-31');
    const schema = SchemaValidator.date().max(maxDate);

    const validationResult = schema.validate(new Date('2023-01-01'));
    expect(validationResult.isValid).toBe(false); // Should be false because the date is after the maximum
    expect(validationResult.errors).toContain(`Date must be before ${maxDate.toISOString()}.`);
  });

  it('should enforce required validation correctly', () => {
    const schema = SchemaValidator.date().required(true);

    let validationResult = schema.validate(undefined);
    expect(validationResult.isValid).toBe(false); // Should be false because the value is undefined
    expect(validationResult.errors).toContain('Value is required.');

    validationResult = schema.validate(new Date());
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });

});
