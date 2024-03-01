import { validateNumber } from "../../src";
import { INumberValidationOptions } from "../../src/interfaces/INumberValidationOptions";

describe('validateNumber', () => {

    it('should pass validation for a number within specified range', () => {
        const options: INumberValidationOptions = { min: 1, max: 10 };
        const result = validateNumber(5, options);
        expect(result.isValid).toBeTruthy();
    });

    it('should fail validation for a number below the minimum', () => {
        const options: INumberValidationOptions = { min: 1 };
        const result = validateNumber(0, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`The number must be greater than or equal to ${options.min}.`);
    });

    it('should fail validation for a number above the maximum', () => {
        const options: INumberValidationOptions = { max: 10 };
        const result = validateNumber(11, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`The number must be less than or equal to ${options.max}.`);
    });

    it('should fail validation for a non-integer when only integers are allowed', () => {
        const options: INumberValidationOptions = { integerOnly: true };
        const result = validateNumber(5.5, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`The number must be an integer.`);
    });

    it('should fail validation for a non-positive number when only positive numbers are allowed', () => {
        const options: INumberValidationOptions = { positiveOnly: true };
        const result = validateNumber(-1, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`The number must be positive.`);
    });

    it('should fail validation for a non-negative number when only negative numbers are allowed', () => {
        const options: INumberValidationOptions = { negativeOnly: true };
        const result = validateNumber(1, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`The number must be negative.`);
    });

    it('should fail validation for a number with too many decimal places', () => {
        const options: INumberValidationOptions = { precision: 2 };
        const result = validateNumber(1.234, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`The number must not have more than ${options.precision} decimal places.`);
    });

    it('should fail validation for a number not divisible by specified value', () => {
        const options: INumberValidationOptions = { divisibleBy: 3 };
        const result = validateNumber(5, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`The number must be divisible by ${options.divisibleBy}.`);
    });

    it('should fail validation for a number that is not allowed', () => {
        const options: INumberValidationOptions = { notEqualTo: [5, 10] };
        const result = validateNumber(5, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`The number is not allowed.`);
    });

    it('should fail validation for a number that does not match any of the specified allowed values', () => {
        const options: INumberValidationOptions = { equalTo: [3, 6, 9] };
        const result = validateNumber(5, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`The number must equal one of the predefined values.`);
    });

});
