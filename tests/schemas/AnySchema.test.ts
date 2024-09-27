import { SchemaValidator } from "../../src";

describe('AnySchema', () => {
  
  it('should be defined', () => {
    const schema = SchemaValidator.any();
    expect(schema).toBeDefined();
  });

  it('should validate any type of value as valid', () => {
    const schema = SchemaValidator.any();

    expect(schema.validate(123).isValid).toBe(true);
    expect(schema.validate('string').isValid).toBe(true);
    expect(schema.validate(true).isValid).toBe(true);
    expect(schema.validate({ key: 'value' }).isValid).toBe(true);
    expect(schema.validate([1, 2, 3]).isValid).toBe(true);
  });

  it('should return no errors when validating any value', () => {
    const schema = SchemaValidator.any();

    const validationResult = schema.validate(123);
    expect(validationResult.errors).toHaveLength(0);

    const validationResultString = schema.validate('string');
    expect(validationResultString.errors).toHaveLength(0);
  });

  it('should allow undefined or null as valid values', () => {
    const schema = SchemaValidator.any().required(false).nullable(true);
  
    expect(schema.validate(undefined).isValid).toBe(true); 
    expect(schema.validate(null).isValid).toBe(true);
  });

  it('should allow chaining with required() method and validate correctly', () => {
    const schema = SchemaValidator.any().required(true);

    expect(schema.validate(undefined).isValid).toBe(false);
    expect(schema.validate(null).isValid).toBe(false);
    expect(schema.validate('valid').isValid).toBe(true);
  });

});
