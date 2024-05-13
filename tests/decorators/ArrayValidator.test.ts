import "reflect-metadata";
import { ClassValidator, Array, ContextValidation } from "../../src";

@ClassValidator
class TestClass {
    @Array({
        minLength: 2,
        maxLength: 4,
        unique: true,
        validator: (item: number) => ({ isValid: item > 0, errors: item <= 0 ? ['Item must be greater than 0'] : [] })
    }, { groups: ['ADMIN'] })
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

    it('should validate array with valid constraints for allowed group', () => {
        jest.spyOn(ContextValidation.getInstance(), 'getGroups').mockReturnValue(['ADMIN']);

        expect(() => new TestClass([1, 2, 3])).not.toThrow();
    });

    it('should not validate array with invalid constraints for disallowed group', () => {
        jest.spyOn(ContextValidation.getInstance(), 'getGroups').mockReturnValue(['USER']);

        expect(() => new TestClass([1, 2, 3, 4, 5, 6])).not.toThrow();
    });
});

describe('ContextValidation', () => {
    beforeEach(() => {
        // Reset the singleton before each test
        ContextValidation.resetInstance(); // This function needs to be implemented to reset the singleton
    });

    it('should allow setting and retrieving validation groups', () => {
        const contextValidation = ContextValidation.getInstance();
        expect(contextValidation.getGroups()).toEqual([]); // Make sure there are no groups initially

        contextValidation.setGroups(['ADMIN', 'USER']);
        expect(contextValidation.getGroups()).toEqual(['ADMIN', 'USER']); // Verify that groups are set correctly

        contextValidation.setGroups(['MANAGER']);
        expect(contextValidation.getGroups()).toEqual(['MANAGER']); // Verify that groups can be changed
    });
});

describe('ArrayValidator with ContextValidation', () => {
    beforeEach(() => {
        // Reset the singleton before each test
        ContextValidation.resetInstance(); // This function needs to be implemented to reset the singleton
    });

    it('should validate array with valid constraints for allowed group', () => {
        ContextValidation.getInstance().setGroups(['ADMIN']); // Set active groups to 'ADMIN'
        expect(() => new TestClass([1, 2, 3])).not.toThrow();
    });

    it('should not perform validation for disallowed group', () => {
        ContextValidation.getInstance().setGroups(['USER']); // Switch to a group that does not have permission
        expect(() => new TestClass([1, 2, 3, 4, 5, 6])).not.toThrow(); // Validation should not throw exception due to missing group 'ADMIN'
    });
});
