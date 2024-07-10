import { validateBIC } from "../../src";
import { IBICValidationOptions } from "../../src/interfaces/IBICValidationOptions";

describe('validateBIC', () => {
  const validBICs = ['DEUTDEFF', 'NEDSZAJJ', 'DABAIE2D', 'BOFAUS3N', 'BNPAFRPP'];

  it('should pass with a valid BIC', () => {
    const options: IBICValidationOptions = { message: "Invalid BIC" };
    validBICs.forEach(code => {
      expect(validateBIC(code, options).isValid).toBeTruthy();
    });
  });

  const invalidBICs = ['ZZZZZZZZ', 'XX123456', ''];
  it('should fail with an invalid BIC', () => {
    const options: IBICValidationOptions = { message: "Invalid BIC" };
    invalidBICs.forEach(code => {
      expect(validateBIC(code, options).isValid).toBeFalsy();
    });
  });

  it('should return a custom error message for an invalid BIC', () => {
    const customMessage = "Custom error message";
    const options: IBICValidationOptions = { message: customMessage };
    const result = validateBIC('ZZZZZZZZ', options);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toContain(customMessage);
  });

  it('should handle an empty BIC', () => {
    const options: IBICValidationOptions = { message: "BIC is empty" };
    const result = validateBIC('', options);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toContain("BIC is empty");
  });

  it('should handle undefined value', () => {
    const options: IBICValidationOptions = { message: "BIC is undefined" };
    const result = validateBIC(undefined as any, options);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toContain("BIC is undefined");
  });

  it('should handle null value', () => {
    const options: IBICValidationOptions = { message: "BIC is null" };
    const result = validateBIC(null as any, options);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toContain("BIC is null");
  });

  it('should use the default error message if none is provided', () => {
    const options: IBICValidationOptions = {};
    const result = validateBIC('ZZZZZZZZ', options);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toContain('Value is not a valid BIC: invalid country code.');
  });
});
