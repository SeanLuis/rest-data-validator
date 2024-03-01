import { isValidDate } from "../../src/utils/date/DateValidation";

describe('isValidDate', () => {
    it('should return true for a valid date string in YYYY-MM-DD format', () => {
        expect(isValidDate('2022-06-15')).toBeTruthy();
    });

    it('should return false for an invalid date string', () => {
        expect(isValidDate('not a date')).toBeFalsy();
    });

    it('should return false for a date string in an incorrect format', () => {
        expect(isValidDate('06-15-2022')).toBeFalsy(); // MM-DD-YYYY format
    });

    it('should return false for a non-existent date', () => {
        expect(isValidDate('2022-02-30')).toBeFalsy(); // February 30th does not exist
    });
});
