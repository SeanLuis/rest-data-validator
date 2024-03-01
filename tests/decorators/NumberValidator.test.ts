import {ClassValidator, NumberValidator} from "../../src";

@ClassValidator
class MyClass {
    @NumberValidator({min: 0, max: 10})
    property: number;

    constructor(property: number) {
        this.property = property;
    }
}

// Pruebas unitarias para el decorador ClassValidator
describe('MyClass with ClassValidator Decorator', () => {
    it('should create an instance without throwing errors for valid data', () => {
        expect(() => new MyClass(5)).not.toThrow();
    });

    it('should throw an error for invalid data', () => {
        // Asegúrate de ajustar este test según la lógica específica de validación
        expect(() => new MyClass(-1)).toThrow('Validation failed:');
    });
});
