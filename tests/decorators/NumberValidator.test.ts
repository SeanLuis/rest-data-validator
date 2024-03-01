import { ClassValidator, NumberValidator } from "../../src";

@ClassValidator
class Product {
    @NumberValidator({ min: 0, max: 100, integerOnly: true })
    stock: number;

    @NumberValidator({ positiveOnly: true })
    price: number;

    constructor(stock: number, price: number) {
        this.stock = stock;
        this.price = price;
    }
}

describe('Product with NumberValidator Decorator', () => {
    it('should accept valid stock and price values', () => {
        expect(() => new Product(50, 19.99)).not.toThrow();
    });

    it('should reject negative stock values', () => {
        expect(() => new Product(-5, 19.99)).toThrow('Validation failed:');
    });

    it('should reject non-integer stock values', () => {
        expect(() => new Product(10.5, 19.99)).toThrow('Validation failed:');
    });

    it('should reject negative price values', () => {
        expect(() => new Product(10, -1)).toThrow('Validation failed:');
    });
});
