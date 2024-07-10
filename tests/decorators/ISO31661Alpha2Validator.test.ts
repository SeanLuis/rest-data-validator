import { ClassValidator, ISO31661Alpha2 } from "../../src";

@ClassValidator
class Country {
    @ISO31661Alpha2({ message: "Invalid country code" })
    code: string;

    constructor(code: string) {
        this.code = code;
    }
}

describe('Country with ISO31661Alpha2 Decorator', () => {
  const validCodes = ['US', 'DE', 'BR', 'IN', 'JP'];
  it.each(validCodes)('should create an instance without throwing errors for a valid country code %s', (validCode) => {
    expect(() => new Country(validCode)).not.toThrow();
  });

  const invalidCodes = ['ZZ', 'XX', '', null, undefined, 123];
  it.each(invalidCodes)('should throw an error for an invalid country code %s', (invalidCode) => {
    expect(() => new Country(invalidCode as any)).toThrow('Validation failed:');
  });

  it('should throw a default error message for an invalid country code when no custom message is provided', () => {
    @ClassValidator
    class CountryWithoutCustomMessage {
        @ISO31661Alpha2({})
        code: string;

        constructor(code: string) {
            this.code = code;
        }
    }

    expect(() => new CountryWithoutCustomMessage("ZZ" as any)).toThrow('Validation failed:');
  });

  it('should throw an error for null or undefined country code', () => {
    expect(() => new Country(null as any)).toThrow('Validation failed:');
    expect(() => new Country(undefined as any)).toThrow('Validation failed:');
  });
});
