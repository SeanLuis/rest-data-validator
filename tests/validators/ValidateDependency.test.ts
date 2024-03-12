import { validateDependency } from "../../src";
import { IDependencyValidationOptions } from "../../src/interfaces/IDependencyValidationOptions";

describe("validateDependency Function", () => {
  const obj = { masterValue: "expected" };
  const validationOptions: IDependencyValidationOptions = {
    name: "TestDependencyValidation",
    getDependencies: () => (obj),
    validate: (value, dependencies) => value === "valid" && dependencies.masterValue === "expected",
    message: "Validation failed due to dependency."
  };

  it("should return valid result for correct dependency condition", () => {
    const result = validateDependency(obj, "valid", validationOptions);
    expect(result.isValid).toBeTruthy();
  });

  it("should return invalid result for incorrect dependency condition", () => {
    const result = validateDependency(obj, "invalid", validationOptions);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toContain("Validation failed due to dependency.");
  });
});
