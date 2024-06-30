/**
 * Asserts that the input is a string.
 * Taken from: https://github.com/validatorjs/validator.js/blob/master/src/lib/util/assertString.js
 */
export const assertString = (input: any): void => {
    type InvalidType = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "null";
    let invalidType: InvalidType = typeof input;
  
    if (input === null) {
      invalidType = 'null';
    } else if (invalidType === 'object') {
      invalidType = input.constructor.name as InvalidType;
    }
  
    const isString = typeof input === 'string' || input instanceof String;
  
    if (!isString) {
      throw new TypeError(`Expected a string but received a ${invalidType}`);
    }
  };
  