import { validateContextual } from "../../src";
import { IContextualValidationOptions } from "../../src/interfaces/IContextualValidationOptions";

describe('validateContextual Function', () => {
  it('should validate successfully with a valid context', () => {
    const options: IContextualValidationOptions = {
      name: "TestContextValidation",
      getContext: () => ({ userRole: 'admin' }),
      validate: (value, context) => value === 'secret' && context.userRole === 'admin',
    };

    const validationResult = validateContextual('secret', options);
    expect(validationResult.isValid).toBeTruthy();
  });

  it('should fail validation with an invalid context', () => {
    const options: IContextualValidationOptions = {
      name: "TestContextValidation",
      getContext: () => ({ userRole: 'guest' }),
      validate: (value, context) => value === 'secret' && context.userRole === 'admin',
      message: "Access denied due to insufficient permissions."
    };

    const validationResult = validateContextual('secret', options);
    expect(validationResult.isValid).toBeFalsy();
    expect(validationResult.errors).toContain("Access denied due to insufficient permissions.");
  });
});
