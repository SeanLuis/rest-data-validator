import { ClassValidator, Date } from "../../src";

@ClassValidator
class User {
    @Date({ format: "YYYY-MM-DD" })
    birthDate: string;

    constructor(birthDate: string) {
        this.birthDate = birthDate;
    }
}


describe('User with Date Decorator', () => {
    it('should create an instance without throwing errors for valid birthDate', () => {
        expect(() => new User('2023-01-01')).not.toThrow();
    });

    it('should throw an error for an invalid birthDate', () => {
        expect(() => new User('invalid-date')).toThrow('Validation failed:');
    });
});

