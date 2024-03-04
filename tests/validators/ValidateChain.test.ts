import { validateChain, validateDate, validateNumber } from '../../src';
import { IValidatorWithOptions } from '../../src/interfaces/IValidationChainOptions';
import { ValidatorFunction } from '../../src/types/ValidationResult';

describe('validateChain', () => {
  const alwaysValid: IValidatorWithOptions = {
    validator: (value) => ({ isValid: true, errors: [] })
  };
  
  const alwaysInvalid: IValidatorWithOptions = {
    validator: (value) => ({ isValid: false, errors: ['Error'] })
  };

  it('should return valid result if all validators pass', () => {
    const result = validateChain('test', { validators: [alwaysValid, alwaysValid] });
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });
  
  it('should return invalid result if any validator fails', () => {
    const result = validateChain('test', { validators: [alwaysValid, alwaysInvalid] });
    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual(['Error']);
  });

  it('should work with real validators and options', () => {
    const dateResult = validateChain('2022-01-01', { validators: [{ validator: validateDate, options: { format: 'YYYY-MM-DD' } }] });
    expect(dateResult.isValid).toBe(true);

    const numberResult = validateChain(123, { validators: [{ validator: validateNumber, options: { min: 100, max: 200 } }] });
    expect(numberResult.isValid).toBe(true);

    const mixedResult = validateChain(123, { validators: [{ validator: validateDate, options: { format: 'YYYY-MM-DD' } }, { validator: validateNumber, options: { min: 100, max: 200 } }] });
    expect(mixedResult.isValid).toBe(false);
    expect(mixedResult.errors).toContain('Invalid date.');
  });
});