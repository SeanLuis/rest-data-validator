import { ClassValidator, Required } from "../../src";

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
        expect(() => user.name).toThrow('Validation failed:');
    });
});