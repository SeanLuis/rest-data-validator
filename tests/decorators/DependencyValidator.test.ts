import { AgricultureProduct } from "../__mocks__/agricultural.mocks";
import { execValidations } from "../__mocks__/agricultural.validations";

execValidations();

describe("AgricultureProduct Comprehensive Validation", () => {
  it("should pass all validations for a fully compliant product", () => {
    expect(() => {
      new AgricultureProduct(
        new Date("2023-01-01"),
        new Date("2023-01-02"),
        50,
        4,
        "Caja",
        1,
        true,
        "España",
        true,
        true
      );
    }).not.toThrow();
  });

  it("should fail validation for a product under the minimum weight", () => {
    expect(() => {
      new AgricultureProduct(
        new Date("2023-01-01"),
        new Date("2023-01-02"),
        4,
        4,
        "Caja",
        5,
        true,
        "España",
        true,
        true
      );
    }).toThrow();
  });

  it("should fail validation for a product with insufficient quality rating", () => {
    expect(() => {
      new AgricultureProduct(
        new Date("2023-01-01"),
        new Date("2023-01-02"),
        50,
        2,
        "Caja",
        5,
        true,
        "España",
        true,
        true
      );
    }).toThrow();
  });

  it("should fail validation for a product with incorrect packaging type", () => {
    expect(() => {
      new AgricultureProduct(
        new Date("2023-01-01"),
        new Date("2023-01-02"),
        50,
        4,
        "Plástico",
        5,
        true,
        "España",
        true,
        true
      );
    }).toThrow();
  });

  it("should fail validation for a product stored at incorrect temperature", () => {
    expect(() => {
      new AgricultureProduct(
        new Date("2023-01-01"),
        new Date("2023-01-02"),
        50,
        4,
        "Caja",
        -3,
        true,
        "España",
        true,
        true
      );
    }).toThrow();
  });

  it("should fail validation for a non-organic product sold in a restricted country", () => {
    expect(() => {
      new AgricultureProduct(
        new Date("2023-01-01"),
        new Date("2023-01-02"),
        50,
        4,
        "Caja",
        5,
        false,
        "Alemania",
        true,
        true
      );
    }).toThrow();
  });
});

