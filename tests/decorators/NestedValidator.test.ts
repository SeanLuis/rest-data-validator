// @ts-nocheck

import { Nested, String, Number, ClassValidator, simpleValidatorFactory, combinedValidatorFactory } from "../../src";
import { IValidator } from "../../src/interfaces/INestedValidationOptions";
import { ValidationUtils } from "../../src/utils/validations/ValidationUtils";

@ClassValidator
class UserProfile {
    @String({
        minLength: 2,
        maxLength: 5
    })
    username: string;

    @String({
        regexPattern: /^[a-z]+$/
    })
    nickname: string;

    constructor(username: string, nickname: string) {
        this.username = username;
        this.nickname = nickname;
    }
}

@ClassValidator
class User {
    @String({ minLength: 3, maxLength: 20 })
    name: string;

    @Number({ min: 0 })
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

@ClassValidator
class Product {
    @String({ minLength: 1, maxLength: 100 })
    name: string;

    @Number({ positiveOnly: true })
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

class Order {
    user: User;
    products: Product[];

    constructor(user: User, products: Product[]) {
        this.user = user;
        this.products = products;
    }
}

const isUserValidator: IValidator<any> = simpleValidatorFactory<any>({
    condition: (value: any) => value instanceof User && value.name.startsWith('valid') && value.age > 18,
    errorMessage: "Value is not a valid User."
});

const isProductValidator: IValidator<any> = simpleValidatorFactory<any>({
    condition: (value: any) => value instanceof Product && value.name.startsWith('valid') && value.price > 10,
    errorMessage: "Value is not a valid Product."
});

const isOrderValidator: IValidator<any> = simpleValidatorFactory<any>({
    condition: (value: any) => value instanceof Order && isUserValidator.validate(value.user).isValid && value.products.every(product => isProductValidator.validate(product).isValid),
    errorMessage: "Value is not a valid Order."
});

const complexClassValidatorWithOptions: IValidator<any> = combinedValidatorFactory([
    { validator: isUserValidator, typeGuard: (value: any): value is User => value instanceof User },
    { validator: isProductValidator, typeGuard: (value: any): value is Product => value instanceof Product },
    { validator: isOrderValidator, typeGuard: (value: any): value is Order => value instanceof Order },
]);

@ClassValidator
class ComplexClass {
    @Nested({
        validator: complexClassValidatorWithOptions,
        validationOptions: { prefix: 'valid', minAge: 18, minPrice: 10 },
        each: true,
    })
    user: User;

    @Nested({
        validator: complexClassValidatorWithOptions,
        validationOptions: { prefix: 'valid', minAge: 18, minPrice: 10 },
        each: true,
    })
    order: Order;

    @Nested({
        validator: complexClassValidatorWithOptions,
        validationOptions: { prefix: 'valid', minAge: 18, minPrice: 10 },
        each: true,
    })
    products: Product[];

    constructor(user: User, order: Order, products: Product[]) {
        this.user = user;
        this.order = order;
        this.products = products;
    }
}

describe('ComplexClass Decorator Validation', () => {
    it('should create an instance without throwing errors for valid data', () => {
        const user = new User('validUser', 20);
        const products = [new Product('validProduct', 15), new Product('validProduct', 15)];
        const order = new Order(user, products);

        expect(() => new ComplexClass(user, order, products)).not.toThrow();
    });

    it('should throw an error for complex structures with invalid data', () => {
        const user = new User('invalidUser', 15);
        const products = [new Product('invalidProduct', 5)];
        const order = new Order(user, products);

        expect(() => new ComplexClass(user, order, products)).toThrow('Validation failed:');
    });
});

describe('Validation with Decorators', () => {
    describe('UserProfile Validation', () => {
        it('should accept valid username and nickname', () => {
            expect(() => new UserProfile("Jo", "joe")).not.toThrow();
        });

        it('should reject username outside the specified length range', () => {
            expect(() => new UserProfile("J", "joe")).toThrow('Validation failed:');
            expect(() => new UserProfile("JohnDoe", "joe")).toThrow('Validation failed:');
        });

        it('should reject nickname with uppercase letters', () => {
            expect(() => new UserProfile("John", "Joe")).toThrow('Validation failed:');
        });
    });

    describe('Product Validation', () => {
        it('should accept valid stock and price values', () => {
            expect(() => new Product("ValidProduct", 19.99)).not.toThrow();
        });

        it('should reject negative price values', () => {
            expect(() => new Product("InvalidProduct", -1)).toThrow('Validation failed:');
        });
    });

    describe('Complex Structure Validation', () => {
        it('should validate complex structures with valid data', () => {
            const user = new User("ValidName", 21);
            const products = [new Product("ValidProduct", 15.99), new Product("AnotherValidProduct", 25.50)];
            const order = new Order(user, products);

            expect(() => validateOrder(order)).not.toThrow();
        });

        it('should fail validation for complex structures with invalid data', () => {
            const user = new User('invalidUser', 15);

            let products = [];
            try {
                products = [new Product('invalidProduct', -5)];
            } catch (error: any) {
                expect(error.message).toContain('Validation failed:');
                expect(error.message).toContain('The number must be positive.'); // Verifica que el mensaje incluya la razón específica del fallo.
            }

            const order = new Order(user, products);
            expect(() => new ComplexClass(user, order, products)).toThrow("Validation failed: Validation failed for property 'user': Value is not a valid User.")
        });
    });
});

function validateOrder(order: Order) {
    const userValidationResult = ValidationUtils.validate(order.user);
    if (!userValidationResult.isValid) {
        throw new Error('Validation failed for User.');
    }

    order.products.forEach((product: Product) => {
        const productValidationResult = ValidationUtils.validate(product);
        if (!productValidationResult.isValid) {
            throw new Error('Validation failed for Product.');
        }
    });
}


