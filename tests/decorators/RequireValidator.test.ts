import { ClassValidator, Required } from "../../src";
import {ValidationMetadata} from "../../src/metadata/ValidationMetadata";

@ClassValidator
class TestUser {
    @Required()
    name?: string;

    constructor(name?: string) {
        this.name = name;
    }
}

describe('TestUser with Required Decorator', () => {
    it('should create an instance without throwing errors for valid name', () => {
        expect(() => new TestUser('John Doe')).not.toThrow();
    });

    it('should throw an error for an undefined name', () => {
        const user = new TestUser();
        expect(() => { let _ = user.name; }).toThrow('Validation failed: name is required.');
    });
});

class TestClass {
    @Required()
    public prop: string | undefined;
}

describe("RequiredValidator Decorator", () => {
    it("should throw an error when accessing a required property without setting a value", () => {
        const testInstance = new TestClass();

        expect(() => testInstance.prop).toThrow(`Validation failed: prop is required.`);
    });

    it("should not throw an error when accessing a required property after setting a value", () => {
        const testInstance = new TestClass();
        testInstance.prop = 'value';

        expect(() => testInstance.prop).not.toThrow();
        expect(testInstance.prop).toBe('value');
    });

    it("should not throw an error when accessing a required property after setting a value", () => {
        const testInstance = new TestClass();
        testInstance.prop = 'value';

        expect(() => ValidationMetadata.getForProperty(testInstance, 'prop')).not.toThrow();
    });
});