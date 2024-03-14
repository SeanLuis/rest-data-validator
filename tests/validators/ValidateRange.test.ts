import { validateRange } from "../../src";

describe("validateRange", () => {
  describe("Number Validation", () => {
    it("should pass for a number within the specified range", () => {
      const options = { min: 1, max: 10, inclusive: true };
      expect(validateRange(5, options).isValid).toBeTruthy();
    });

    it("should fail for a number below the minimum", () => {
      const options = { min: 1, inclusive: true };
      expect(validateRange(0, options).isValid).toBeFalsy();
    });

    it("should fail for a number above the maximum", () => {
      const options = { max: 10, inclusive: true };
      expect(validateRange(11, options).isValid).toBeFalsy();
    });

    it("should fail for a number not a multiple of the step", () => {
      const options = { step: 2 };
      expect(validateRange(3, options).isValid).toBeFalsy();
    });

    it("should pass for a number that is a multiple of the step", () => {
      const options = { step: 3 };
      expect(validateRange(9, options).isValid).toBeTruthy();
    });
  });

  describe("Date Validation", () => {
    it("should fail for a date outside the specified range", () => {
      const options = {
        min: new Date("2022-01-01"),
        max: new Date("2022-12-31"),
        inclusive: true,
        customValidator: (value: number | Date) =>
          value instanceof Date && value >= options.min && value <= options.max,
      };
      const outOfRangeDate = new Date("2023-01-01");
      expect(validateRange(outOfRangeDate, options).isValid).toBeFalsy();
    });

    it("should pass for a date within the specified range", () => {
      const options = {
        min: new Date("2022-01-01"),
        max: new Date("2022-12-31"),
        inclusive: true,
        customValidator: (value: number | Date) =>
          value instanceof Date && value >= options.min && value <= options.max,
      };
      const inRangeDate = new Date("2022-06-01");
      expect(validateRange(inRangeDate, options).isValid).toBeTruthy();
    });
  });

  describe("Custom Validator", () => {
    it("should fail when custom validator returns false", () => {
      const options = { customValidator: () => false };
      expect(validateRange(5, options).isValid).toBeFalsy();
    });

    it("should pass when custom validator returns true", () => {
      const options = { customValidator: () => true };
      expect(validateRange(5, options).isValid).toBeTruthy();
    });
  });

  describe("String Date Validation", () => {
    it("should pass for a valid date string", () => {
      const options = { dateFormat: "YYYY-MM-DD" };
      expect(validateRange("2022-01-01", options).isValid).toBeTruthy();
    });

    it("should fail for an invalid date string", () => {
      const options = { dateFormat: "YYYY-MM-DD" };
      expect(validateRange("invalid-date", options).isValid).toBeFalsy();
    });
  });

  describe("Without Custom Validator", () => {
    it("should pass when no custom validator is provided", () => {
      const options = { min: 1, max: 10, inclusive: true };
      expect(validateRange(5, options).isValid).toBeTruthy();
    });
  });

  describe("Error Messages", () => {
    it("should use the provided min error message", () => {
      const options = { min: 10, errorMessage: { min: "Value is too small." } };
      const result = validateRange(5, options);
      expect(result.isValid).toBeFalsy();
      expect(result.errors).toContain("Value is too small.");
    });

    it("should use the provided max error message", () => {
      const options = { max: 10, errorMessage: { max: "Value is too large." } };
      const result = validateRange(15, options);
      expect(result.isValid).toBeFalsy();
      expect(result.errors).toContain("Value is too large.");
    });
  });
});
