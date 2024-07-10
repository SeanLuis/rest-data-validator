import { validateISO31661Alpha2 } from "../../src";
import { IISO31661Alpha2ValidationOptions } from "../../src/interfaces/IISO31661Alpha2ValidationOptions";

describe('validateISO31661Alpha2', () => {
  const validCodes = ['US', 'DE', 'BR', 'IN', 'JP'];

  it('should pass with a valid ISO 3166-1 alpha-2 code', () => {
    const options: IISO31661Alpha2ValidationOptions = { message: "Invalid country code" };
    validCodes.forEach(code => {
      expect(validateISO31661Alpha2(code, options).isValid).toBeTruthy();
    });
  });

  const invalidCodes = ['ZZ', 'XX', ''];
  it('should fail with an invalid ISO 3166-1 alpha-2 code', () => {
    const options: IISO31661Alpha2ValidationOptions = { message: "Invalid country code" };
    invalidCodes.forEach(code => {
      expect(validateISO31661Alpha2(code, options).isValid).toBeFalsy();
    });
  });

  it('should return a custom error message for an invalid ISO 3166-1 alpha-2 code', () => {
    const customMessage = "Custom error message";
    const options: IISO31661Alpha2ValidationOptions = { message: customMessage };
    const result = validateISO31661Alpha2('ZZ', options);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toContain(customMessage);
  });

  it('should handle an empty code', () => {
    const options: IISO31661Alpha2ValidationOptions = { message: "Code is empty" };
    const result = validateISO31661Alpha2('', options);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toContain("Code is empty");
  });

  it('should handle undefined value', () => {
    const options: IISO31661Alpha2ValidationOptions = { message: "Code is undefined" };
    const result = validateISO31661Alpha2(undefined as any, options);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toContain("Code is undefined");
  });

  it('should handle null value', () => {
    const options: IISO31661Alpha2ValidationOptions = { message: "Code is null" };
    const result = validateISO31661Alpha2(null as any, options);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toContain("Code is null");
  });

  it('should use the default error message if none is provided', () => {
    const options: IISO31661Alpha2ValidationOptions = {};
    const result = validateISO31661Alpha2('ZZ', options);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toContain('Value is not a valid ISO 3166-1 alpha-2 code.');
  });
});
