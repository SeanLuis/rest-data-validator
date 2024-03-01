import "reflect-metadata";
import { ClassValidator, Array } from "../../src";

@ClassValidator
class TestClass {
    @Array({
        minLength: 2,
        maxLength: 4,
        unique: true,
        validator: (item: number) => ({ isValid: item > 0, errors: item <= 0 ? ['Item must be greater than 0'] : [] })
    })
    public numbers: number[];

    constructor(numbers: number[]) {
        this.numbers = numbers;
    }
}

describe('ArrayValidator', () => {
    it('should validate array with valid constraints', () => {
        expect(() => new TestClass([1, 2, 3])).not.toThrow();
    });

    it('should throw an error if array exceeds maxLength', () => {
        expect(() => new TestClass([1, 2, 3, 4, 5])).toThrow('Validation failed:');
    });

    it('should throw an error if array elements are not unique', () => {
        expect(() => new TestClass([1, 1, 2])).toThrow('Validation failed:');
    });

    it('should throw an error if any element does not pass the custom validator', () => {
        expect(() => new TestClass([1, -1, 2])).toThrow('Validation failed:');
    });

    it('should throw an error if array is shorter than minLength', () => {
        expect(() => new TestClass([1])).toThrow('Validation failed:');
    });

    it('should allow arrays that meet all validation criteria', () => {
        expect(() => new TestClass([1, 2])).not.toThrow();
    });
});
