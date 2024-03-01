import { validateDate } from "../../src";

describe('validateDate', () => {
  const beforeDate = new Date('2024-12-31');
  const afterDate = new Date('2020-01-01');

  it('should pass with a valid date string', () => {
    const options = { before: beforeDate, after: afterDate };
    const validDateString = '2022-06-15';
    expect(validateDate(validDateString, options).isValid).toBeTruthy();
  });

  it('should fail with a date string after the `before` date', () => {
    const options = { before: beforeDate };
    const invalidDateString = '2025-01-01';
    expect(validateDate(invalidDateString, options).isValid).toBeFalsy();
  });

  it('should fail with a date string before the `after` date', () => {
    const options = { after: afterDate };
    const invalidDateString = '2019-12-31';
    expect(validateDate(invalidDateString, options).isValid).toBeFalsy();
  });

  it('should handle invalid date formats', () => {
    const options = {};
    const invalidDateString = 'not a date';
    expect(validateDate(invalidDateString, options).isValid).toBeFalsy();
  });

  it('should handle valid date formats', () => {
    const options = {};
    const validDateString = '2022-06-15';
    expect(validateDate(validDateString, options).isValid).toBeTruthy();
  });
});
