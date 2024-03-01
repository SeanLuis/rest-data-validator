import { ClassValidator, DateValidator } from "../../src";

@ClassValidator
class User {
    @DateValidator({ format: "YYYY-MM-DD" })
    birthDate: string;

    constructor(birthDate: string) {
        this.birthDate = birthDate;
    }
}


// Pruebas unitarias para el decorador ClassValidator
describe('User with DateValidator Decorator', () => {
    it('should create an instance without throwing errors for valid birthDate', () => {
        expect(() => new User('2023-01-01')).not.toThrow();
    });

    it('should throw an error for an invalid birthDate', () => {
        // Esta prueba depende de que la validación efectivamente verifique el formato y validez de la fecha
        expect(() => new User('invalid-date')).toThrow('Validation failed:');
    });
});

