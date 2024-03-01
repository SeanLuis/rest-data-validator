import { validateEnum } from "../../src";
import { IEnumValidationOptions } from "../../src/interfaces/IEnumValidationOptions";

describe('validateEnum', () => {
    enum TestEnum {
        FIRST_VALUE = "First",
        SECOND_VALUE = "Second",
        THIRD_VALUE = "Third"
    }

    it('should pass with a valid enum member', () => {
        const options = { enum: Object.values(TestEnum), message: "Not a valid member of TestEnum" };
        const validEnumMember = TestEnum.FIRST_VALUE;
        expect(validateEnum(validEnumMember, options).isValid).toBeTruthy();
    });

    it('should fail with an invalid enum member', () => {
        const options: IEnumValidationOptions<string> = {
            enum: Object.values(TestEnum),
            message: "Not a valid member of TestEnum"
        };
        const invalidEnumMember = "Fourth"; // Not in TestEnum
        expect(validateEnum(invalidEnumMember, options).isValid).toBeFalsy();
    });

    it('should return a custom error message for an invalid enum member', () => {
        const customMessage = "Custom error message";
        const options: IEnumValidationOptions<string> = {
            enum: Object.values(TestEnum),
            message: customMessage
        };
        const invalidEnumMember = "Fifth"; // Not in TestEnum
        const result = validateEnum(invalidEnumMember, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(customMessage);
    });

    it('should handle an empty enum', () => {
        const options = { enum: [], message: "Enum is empty" };
        const value = "AnyValue";
        const result = validateEnum(value, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain("Enum is empty");
    });

    it('should handle undefined value', () => {
        const options = { enum: Object.values(TestEnum), message: "Value is undefined" };
        const value = undefined;
        const result = validateEnum(value as any, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain("Value is undefined");
    });

    it('should use the default error message if none is provided', () => {
        const options: IEnumValidationOptions<string> = {
            enum: Object.values(TestEnum)
        };
        const invalidEnumMember = "Sixth"; // Not in TestEnum
        const result = validateEnum(invalidEnumMember, options);
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContain(`Value is not a valid enumeration member.`);
    });
});
