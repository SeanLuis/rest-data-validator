import * as path from 'path';

describe('SchemaFileProvider', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...process.env };
  });

  describe('getSchema', () => {
    it('should correctly handle string schema with minLength and maxLength', async () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/schema_types.yaml');
      const { getSchema, StringSchema } = await import('../../src');
      const schema = getSchema('stringSchema');

      expect(schema).toBeInstanceOf(StringSchema);

      const validUsername = 'john_doe';
      const validationResult = schema.validate(validUsername);
      expect(validationResult.isValid).toBe(true);

      const invalidUsername = 'jd';
      const invalidResult = schema.validate(invalidUsername);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('String is too short. Minimum length is 3.');
    });

    it('should correctly handle number schema with minimum and maximum', async () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/schema_types.yaml');
      const { getSchema, NumberSchema } = await import('../../src');
      const schema = getSchema('numberSchema');

      expect(schema).toBeInstanceOf(NumberSchema);

      const validSize = 50;
      const validationResult = schema.validate(validSize);
      expect(validationResult.isValid).toBe(true);

      const invalidSize = 150;
      const invalidResult = schema.validate(invalidSize);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Number is too large. Maximum value is 100.');
    });

    it('should correctly handle boolean schema', async () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/schema_types.yaml');
      const { getSchema, BooleanSchema } = await import('../../src');
      const schema = getSchema('booleanSchema');

      expect(schema).toBeInstanceOf(BooleanSchema);

      const validValue = true;
      const validationResult = schema.validate(validValue);
      expect(validationResult.isValid).toBe(true);

      const invalidValue = 'true';
      const invalidResult = schema.validate(invalidValue);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Value must be a boolean.');
    });

    it('should correctly handle object schema with properties', async () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/entity_schemas.yaml');
      const { getSchema, ObjectSchema } = await import('../../src');
      const schema = getSchema('employee');

      expect(schema).toBeInstanceOf(ObjectSchema);

      const validEmployee = { employeeId: '123', department: 'IT' };
      const validationResult = schema.validate(validEmployee);
      expect(validationResult.isValid).toBe(true);

      const invalidEmployee = { employeeId: '123' };
      const invalidResult = schema.validate(invalidEmployee);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain("Validation failed for property 'department': Property is missing.");
    });

    it('should correctly handle array schema with items', async () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/schema_types.yaml');
      const { getSchema, ArraySchema } = await import('../../src');
      const schema = getSchema('arraySchema');

      expect(schema).toBeInstanceOf(ArraySchema);

      const validArray = ['one', 'two', 'three'];
      const validationResult = schema.validate(validArray);
      expect(validationResult.isValid).toBe(true);

      const invalidArray = [1, 'two', 3];
      const invalidResult = schema.validate(invalidArray);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Error at index 0: Value must be a string.');
      expect(invalidResult.errors).toContain('Error at index 2: Value must be a string.');
    });

    it('should correctly handle union schema', async () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/schema_types.yaml');
      const { getSchema, UnionSchema } = await import('../../src');
      const schema = getSchema('unionSchema');

      expect(schema).toBeInstanceOf(UnionSchema);

      const validData1 = 'a string';
      const validData2 = 42;

      let validationResult = schema.validate(validData1);
      expect(validationResult.isValid).toBe(true);

      validationResult = schema.validate(validData2);
      expect(validationResult.isValid).toBe(true);

      const invalidData = true;
      validationResult = schema.validate(invalidData);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.errors).toContain('Value does not match any of the allowed types.');
    });

    it('should correctly handle enum schema', async () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/schema_types.yaml');
      const { getSchema, EnumSchema } = await import('../../src');
      const schema = getSchema('enumSchema');

      expect(schema).toBeInstanceOf(EnumSchema);

      const validData = 'RED';
      let validationResult = schema.validate(validData);
      expect(validationResult.isValid).toBe(true);

      const invalidData = 'YELLOW';
      validationResult = schema.validate(invalidData);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.errors).toContain('Value must be one of the following: RED, GREEN, BLUE');
    });

    it('should correctly handle literal schema', async () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/schema_types.yaml');
      const { getSchema, LiteralSchema } = await import('../../src');
      const schema = getSchema('literalSchema');

      expect(schema).toBeInstanceOf(LiteralSchema);

      const validData = 'exactValue';
      let validationResult = schema.validate(validData);
      expect(validationResult.isValid).toBe(true);

      const invalidData = 'wrongValue';
      validationResult = schema.validate(invalidData);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.errors).toContain('Value must be exactly exactValue.');
    });

    it('should correctly handle nullable schema', async () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/schema_types.yaml');
      const { getSchema } = await import('../../src');
      const schema = getSchema('nullableSchema');

      const validData1 = 'some string';
      let validationResult = schema.validate(validData1);
      expect(validationResult.isValid).toBe(true);

      const validData2 = null;
      validationResult = schema.validate(validData2);
      expect(validationResult.isValid).toBe(true);

      const invalidData = 42;
      validationResult = schema.validate(invalidData);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.errors).toContain('Value must be a string.');
    });

    it('should correctly handle tuple schema', async () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/schema_types.yaml');
      const { getSchema, TupleSchema } = await import('../../src');
      const schema = getSchema('tupleSchema');

      expect(schema).toBeInstanceOf(TupleSchema);

      const validData = ['string', 42];
      let validationResult = schema.validate(validData);
      expect(validationResult.isValid).toBe(true);

      const invalidData = [42, 'string'];
      validationResult = schema.validate(invalidData);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.errors).toContain("Validation failed for tuple element at index 0: Value must be a string.");
      expect(validationResult.errors).toContain("Validation failed for tuple element at index 1: Value must be a number.");
    });

    it('should correctly handle transform schema', async () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/schema_types.yaml');
      const { getSchema, TransformSchema } = await import('../../src');
      const schema = getSchema('transformSchema');

      expect(schema).toBeInstanceOf(TransformSchema);

      const inputData = 'lowercase';
      const expectedData = 'LOWERCASE';

      const validationResult = schema.validate(inputData);
      expect(validationResult.isValid).toBe(true);
      expect(validationResult.value).toBe(expectedData);
    });

    it('should correctly handle record schema', async () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/schema_types.yaml');
      const { getSchema, RecordSchema } = await import('../../src');
      const schema = getSchema('recordSchema');

      expect(schema).toBeInstanceOf(RecordSchema);

      const validData = { key1: 1, key2: 2 };
      let validationResult = schema.validate(validData);
      expect(validationResult.isValid).toBe(true);

      const invalidData = { key1: 'not a number' };
      validationResult = schema.validate(invalidData);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.errors).toContain("Invalid value for key 'key1': Value must be a number.");
    });

    it('should correctly handle any schema', async () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/schema_types.yaml');
      const { getSchema, AnySchema } = await import('../../src');
      const schema = getSchema('anySchema');

      expect(schema).toBeInstanceOf(AnySchema);

      const validData1 = 'string';
      let validationResult = schema.validate(validData1);
      expect(validationResult.isValid).toBe(true);

      const validData2 = 42;
      validationResult = schema.validate(validData2);
      expect(validationResult.isValid).toBe(true);

      const validData3 = { any: 'thing' };
      validationResult = schema.validate(validData3);
      expect(validationResult.isValid).toBe(true);
    });

    it('should correctly handle lazy schema without using type null', async () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/schema_types.yaml');
      const { getSchema , LazySchema} = await import('../../src');
      
      const schema = getSchema('lazySchema');
      
      expect(schema).toBeInstanceOf(LazySchema);
    
      const validData = { self: { self: { self: null } } };
      let validationResult = schema.validate(validData);
      expect(validationResult.isValid).toBe(true);
    
      const invalidData = { self: { self: { self: 42 } } };
      validationResult = schema.validate(invalidData);
      expect(validationResult.isValid).toBe(false);
    });
  });

  // describe('Error Handling', () => {
  //   it('should throw an error if unsupported file type is provided', async () => {
  //     process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/invalidSchema.txt');
  //     const { getSchema } = await import('../../src');
  //     expect(() => getSchema('user')).toThrow('Unsupported file type.');
  //   });

  //   it('should throw an error if schema file does not exist', async () => {
  //     process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/nonexistent.yaml');
  //     const { getSchema } = await import('../../src');
  //     expect(() => getSchema('user')).toThrow('ENOENT: no such file or directory');
  //   });

  //   it('should throw an error if no valid schema file is found at base path', async () => {
  //     process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/nonexistent_base_path');
  //     const { getSchema } = await import('../../src');
  //     expect(() => getSchema('user')).toThrow(`No valid schema file found at ${process.env.SCHEMA_FILE_PATH}`);
  //   });

  //   it('should throw an error when schema for entity is not found', async () => {
  //     process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/entity_schemas.yaml');
  //     const { getSchema } = await import('../../src');

  //     expect(() => getSchema('nonExistentEntity')).toThrow('Schema for entity "nonExistentEntity" not found.');
  //   });

  //   it('should throw an error for unsupported schema type', async () => {
  //     process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/unsupported_schema.yaml');
  //     // Suponiendo que 'unsupported_schema.yaml' contiene un esquema con un tipo no soportado
  //     const { getSchema } = await import('../../src');
  //     expect(() => getSchema('unsupportedTypeSchema')).toThrow('Unsupported schema type: unsupportedType');
  //   });

  //   it('should throw an error when loading invalid JSON schema file', async () => {
  //     const fs = require('fs');
  //     const invalidJsonContent = '{"invalidJson":}'; // JSON inválido

  //     jest.spyOn(fs, 'readFileSync').mockReturnValue(invalidJsonContent);

  //     const { loadSchemaFromFile } = await import('../../src');

  //     expect(() => loadSchemaFromFile('schema.json')).toThrow();

  //     fs.readFileSync.mockRestore();
  //   });

  //   it('should throw an error when loading invalid YAML schema file', async () => {
  //     const fs = require('fs');
  //     const invalidYamlContent = 'invalid: [unbalanced brackets'; // YAML inválido

  //     jest.spyOn(fs, 'readFileSync').mockReturnValue(invalidYamlContent);

  //     const { loadSchemaFromFile } = await import('../../src');

  //     expect(() => loadSchemaFromFile('schema.yaml')).toThrow();

  //     fs.readFileSync.mockRestore();
  //   });

  //   it('should throw an error when no valid schema file is found', async () => {
  //     process.env.SCHEMA_FILE_PATH = 'nonexistent_schema_file';

  //     const { getSchema } = await import('../../src');

  //     expect(() => getSchema('user')).toThrow('No valid schema file found at nonexistent_schema_file');
  //   });
  // });
});
