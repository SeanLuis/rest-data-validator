import { ClassValidator, BIC } from "../../src";

@ClassValidator
class Bank {
    @BIC({ message: "Invalid BIC code" })
    code: string;

    constructor(code: string) {
        this.code = code;
    }
}

describe('Bank with BIC Decorator', () => {
  const validBICs = ['DEUTDEFF', 'NEDSZAJJ', 'DABAIE2D', 'BOFAUS3N', 'BNPAFRPP'];
  it.each(validBICs)('should create an instance without throwing errors for a valid BIC %s', (validBIC) => {
    expect(() => new Bank(validBIC)).not.toThrow();
  });

  const invalidBICs = ['ZZZZZZZZ', 'XX123456', '', null, undefined, 12345678];
  it.each(invalidBICs)('should throw an error for an invalid BIC %s', (invalidBIC) => {
    expect(() => new Bank(invalidBIC as any)).toThrow('Validation failed:');
  });

  it('should throw a default error message for an invalid BIC when no custom message is provided', () => {
    @ClassValidator
    class BankWithoutCustomMessage {
        @BIC({})
        code: string;

        constructor(code: string) {
            this.code = code;
        }
    }

    expect(() => new BankWithoutCustomMessage("ZZZZZZZZ" as any)).toThrow('Validation failed:');
  });

  it('should throw an error for null or undefined BIC', () => {
    expect(() => new Bank(null as any)).toThrow('Validation failed:');
    expect(() => new Bank(undefined as any)).toThrow('Validation failed:');
  });
});
