import * as path from 'path';

describe('SchemaFileProvider', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...process.env };
  });

  describe('getSchema', () => {
    it('should correctly load and validate objects against the user schema from YAML', () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/entity_schemas.yaml');
      const { getSchema, ObjectSchema } = require('../../src');
      const schema = getSchema('user');

      expect(schema).toBeInstanceOf(ObjectSchema);

      const validUser = { username: 'john_doe', password: 'strongpassword' };
      const validationResult = schema.validate(validUser);
      expect(validationResult.isValid).toBe(true);

      const invalidUser = { username: 'jd', password: 'strongpassword' };
      const invalidResult = schema.validate(invalidUser);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain("Validation failed for property 'username': String is too short. Minimum length is 3.");
    });

    it('should correctly load and validate objects against the user schema from JSON', () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/entity_schemas.json');
      const { getSchema, ObjectSchema } = require('../../src');
      const schema = getSchema('user');

      expect(schema).toBeInstanceOf(ObjectSchema);

      const validUser = { username: 'john_doe', password: 'strongpassword' };
      const validationResult = schema.validate(validUser);
      expect(validationResult.isValid).toBe(true);

      const invalidUser = { username: 'jd', password: 'strongpassword' };
      const invalidResult = schema.validate(invalidUser);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain("Validation failed for property 'username': String is too short. Minimum length is 3.");
    });

    it('should correctly load and validate objects against the employee schema from YAML', () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/entity_schemas.yaml');
      const { getSchema, ObjectSchema } = require('../../src');
      const schema = getSchema('employee');

      const validEmployee = { employeeId: '123', department: 'IT' };
      const validationResult = schema.validate(validEmployee);
      expect(validationResult.isValid).toBe(true);

      const invalidEmployee = { employeeId: '123' };
      const invalidResult = schema.validate(invalidEmployee);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain("Validation failed for property 'department': Property is missing.");
    });

    it('should correctly load and validate objects against the tenant schema from YAML', () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/entity_schemas.yaml');
      const { getSchema, ObjectSchema } = require('../../src');
      const schema = getSchema('tenant');

      const validTenant = { tenantId: '001', plan: 'premium' };
      const validationResult = schema.validate(validTenant);
      expect(validationResult.isValid).toBe(true);

      const invalidTenant = { tenantId: '001', plan: 'free' };
      const invalidResult = schema.validate(invalidTenant);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain("Validation failed for property 'plan': Value must be one of the following: basic, premium");
    });

    it('should correctly load and validate objects against the package schema from YAML', () => {
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/entity_schemas.yaml');
      const { getSchema, ObjectSchema } = require('../../src');
      const schema = getSchema('package');

      const validPackage = { packageName: 'Box', packageSize: 50 };
      const validationResult = schema.validate(validPackage);
      expect(validationResult.isValid).toBe(true);

      const invalidPackage = { packageName: 'Box', packageSize: 200 };
      const invalidResult = schema.validate(invalidPackage);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain("Validation failed for property 'packageSize': Number is too large. Maximum value is 100.");
    });
  });

  describe('Error Handling', () => {
    it('should throw an error if unsupported file type is provided', () => {
      // Set the environment variable to use an unsupported file
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/invalidSchema.txt');
      
      // Require `getSchema` after resetting modules
      const { getSchema } = require('../../src'); 
      
      //Expect an error to be thrown about unsupported file type
      expect(() => getSchema('user')).toThrow('Unsupported file type: .txt');
    });

    it('should throw an error if schema file does not exist', () => {
      // Set the environment variable to use a file that does not exist
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/nonexistent.yaml');
      
      // Require `getSchema` after resetting modules
      const { getSchema } = require('../../src'); 
      
      // Wait for an error to be thrown about the non-existent file
      expect(() => getSchema('user')).toThrow('Schema file with path');
    });

    it('should throw an error if no valid schema file is found at base path', () => {
      // Set the environment variable to use a base directory with no valid files
      process.env.SCHEMA_FILE_PATH = path.resolve(__dirname, '../__mocks__/nonexistent_base_path');
      
      // Require `getSchema` after resetting modules
      const { getSchema } = require('../../src'); 
      
      // Expect an error to be thrown about missing valid files in the base path
      expect(() => getSchema('user')).toThrow('No valid schema file found at base path');
    });
  });
});
