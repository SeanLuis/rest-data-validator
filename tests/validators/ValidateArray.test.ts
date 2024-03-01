import { validateArray } from "../../src";

describe('validateArray', () => {
  it('should validate array length correctly', () => {
    const options = { minLength: 2, maxLength: 4 };
    const validArray = [1, 2];
    const tooShortArray = [1];
    const tooLongArray = [1, 2, 3, 4, 5];

    expect(validateArray(validArray, options).isValid).toBeTruthy();
    expect(validateArray(tooShortArray, options).isValid).toBeFalsy();
    expect(validateArray(tooLongArray, options).isValid).toBeFalsy();
  });

  it('should enforce unique elements if specified', () => {
    const options = { unique: true };
    const uniqueArray = [1, 2, 3];
    const nonUniqueArray = [1, 1, 2];

    expect(validateArray(uniqueArray, options).isValid).toBeTruthy();
    expect(validateArray(nonUniqueArray, options).isValid).toBeFalsy();
  });

   it('should validate array elements with a custom validator', () => {
    const customValidator = jest.fn((el) => ({
      isValid: el > 0,
      errors: el > 0 ? [] : ['Element must be greater than 0']
    }));
    const options = { validator: customValidator };
    const validElementsArray = [1, 2, 3];
    const invalidElementsArray = [-1, -2, -3];

    const validResult = validateArray(validElementsArray, options);
    const invalidResult = validateArray(invalidElementsArray, options);

    expect(validResult.isValid).toBeTruthy();
    expect(invalidResult.isValid).toBeFalsy();
    expect(customValidator).toHaveBeenCalledTimes(validElementsArray.length + invalidElementsArray.length);
  });

  it('should pass when array meets both minLength and maxLength requirements', () => {
    const options = { minLength: 2, maxLength: 3 };
    const validArray = [1, 2, 3];
    expect(validateArray(validArray, options).isValid).toBeTruthy();
  });

  it('should fail when array does not meet the minLength requirement', () => {
    const options = { minLength: 3 };
    const invalidArray = [1, 2];
    expect(validateArray(invalidArray, options).isValid).toBeFalsy();
  });

  it('should fail when array does not meet the maxLength requirement', () => {
    const options = { maxLength: 5 };
    const invalidArray = [1, 2, 3, 4, 5, 6];
    expect(validateArray(invalidArray, options).isValid).toBeFalsy();
  });

  it('should pass when the unique option is not set, even if there are duplicates', () => {
    const options = {};
    const arrayWithDuplicates = [1, 1, 2];
    expect(validateArray(arrayWithDuplicates, options).isValid).toBeTruthy();
  });

  it('should fail when array is expected to be unique but contains duplicates', () => {
    const options = { unique: true };
    const nonUniqueArray = [1, 1, 2];
    expect(validateArray(nonUniqueArray, options).isValid).toBeFalsy();
  });

  it('should validate array elements with a custom validator', () => {
    const customValidator = jest.fn((value) => ({
      isValid: value > 0,
      errors: value <= 0 ? ['Value must be greater than 0'] : []
    }));

    const options = { validator: customValidator };
    const validArray = [1, 2, 3];
    const invalidArray = [1, -2, 3];

    expect(validateArray(validArray, options).isValid).toBeTruthy();
    expect(validateArray(invalidArray, options).isValid).toBeFalsy();
    expect(customValidator).toHaveBeenCalledWith(1);
    expect(customValidator).toHaveBeenCalledWith(-2);
    expect(customValidator).toHaveBeenCalledWith(3);
  });

  // Considera añadir pruebas para comprobar el manejo de valores no válidos y excepciones
  it('should handle non-array values gracefully', () => {
    const options = { minLength: 1 };
    const notAnArray = 'not an array';
    expect(validateArray(notAnArray as any, options).isValid).toBeFalsy();
  });

  // Considera añadir pruebas para asegurarte de que tu función maneja casos extremos
  // como arrays anidados, objetos dentro de arrays, etc.
  it('should handle nested arrays when no specific validation is set for them', () => {
    const options = {};
    const nestedArray = [1, [2, 3], 4];
    expect(validateArray(nestedArray, options).isValid).toBeTruthy();
  });
});
