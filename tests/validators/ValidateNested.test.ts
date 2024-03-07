import { validateNested } from "../../src";
import { INestedValidationOptions, IValidator } from "../../src/interfaces/INestedValidationOptions";
import { ValidationResult } from "../../src/types/ValidationResult";

// Mock de un validador simple que puedes utilizar en tus tests
const simpleValidator: IValidator<string> = {
  validate: (value: string): ValidationResult => {
    return {
      isValid: value === "valid",
      errors: value !== "valid" ? ["Value is not 'valid'."] : [],
    };
  },
};

describe('validateNested', () => {
  const nestedValidationOptions: INestedValidationOptions<string> = {
    validator: simpleValidator,
    validationOptions: {},
    each: true,
  };

  it('should pass with a valid nested object', () => {
    const value = { nestedProp: "valid" };
    expect(validateNested(value, nestedValidationOptions).isValid).toBeTruthy();
  });

  it('should fail with an invalid nested object', () => {
    const value = { nestedProp: "invalid" };
    const validationResult = validateNested(value, nestedValidationOptions);
    expect(validationResult.isValid).toBeFalsy();
    expect(validationResult.errors).toContain("Validation failed for nested property 'nestedProp': Value is not 'valid'.");
  });

  it('should pass with a valid array of nested objects', () => {
    const value = { nestedArray: ["valid", "valid"] };
    expect(validateNested(value, nestedValidationOptions).isValid).toBeTruthy();
  });

  it('should fail with an invalid array of nested objects', () => {
    const value = { nestedArray: ["valid", "invalid"] };
    const validationResult = validateNested(value, nestedValidationOptions);
    expect(validationResult.isValid).toBeFalsy();
    expect(validationResult.errors).toContain("Element at index 1 in array at property 'nestedArray' is invalid: Value is not 'valid'.");
  });
});

describe('validateNested with complex structures', () => {
    const complexValidator: IValidator<any> = {
      validate: (value) => {
        if (typeof value === "string") {
          return { isValid: value.startsWith("valid"), errors: value.startsWith("valid") ? [] : ["String does not start with 'valid'."] };
        } else if (typeof value === "number") {
          return { isValid: value > 10, errors: value > 10 ? [] : ["Number is not greater than 10."] };
        } else if (Array.isArray(value)) {
          return { isValid: value.length > 0, errors: value.length > 0 ? [] : ["Array is empty."] };
        }
        return { isValid: true, errors: [] };
      },
    };
  
    const options: INestedValidationOptions<any> = {
      validator: complexValidator,
      each: true,
    };
  
    it('should validate complex nested structures', () => {
      const value = {
        stringProp: "validString",
        numberProp: 20,
        arrayProp: ["validElement"],
        nestedObject: {
          stringProp: "invalidString", // This should fail
          numberProp: 5, // This should fail
          arrayProp: [], // This should fail
        },
      };
  
      const validationResult = validateNested(value, options);
      expect(validationResult.isValid).toBeFalsy();
      expect(validationResult.errors).toContain("Validation failed for nested property 'nestedObject': String does not start with 'valid'.");
      expect(validationResult.errors).toContain("Validation failed for nested property 'nestedObject': Number is not greater than 10.");
      expect(validationResult.errors).toContain("Validation failed for nested property 'nestedObject': Array is empty.");
    });
  });
  
