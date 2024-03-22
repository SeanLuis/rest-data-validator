import { validateNested } from "../../src";
import { INestedValidationOptions, IValidator } from "../../src/interfaces/INestedValidationOptions";
import { combinedValidatorFactory, simpleValidatorFactory } from "../../src";
import { IValidationResult } from "../../src";

const stringValidator: IValidator<string> = simpleValidatorFactory<string>({
  condition: value => value === 'valid',
  errorMessage: "Value is not 'valid'."
});

const arrayValidator: IValidator<string[]> = simpleValidatorFactory<string[]>({
  condition: value => JSON.stringify(value) === JSON.stringify(['valid']),
  errorMessage: "Array does not contain only 'valid'."
});

const combinedValidator: IValidator<any> = combinedValidatorFactory([
  { validator: stringValidator, typeGuard: (value: any): value is string => typeof value === 'string' },
  { validator: arrayValidator, typeGuard: (value: any): value is string[] => Array.isArray(value) }
]);

describe('validateNested', () => {
  const nestedValidationOptions: INestedValidationOptions<string> = {
    validator: combinedValidator,
    validationOptions: {},
    each: true,
  };

  it('should pass with a valid nested object', () => {
    const value = { nestedProp: "valid" };
    expect(validateNested(value, nestedValidationOptions).isValid).toBeTruthy();
  });

  it('should fail with an invalid nested object', () => {
    const value = { nestedProp: "invalid" };
    const validationResult = validateNested(value, nestedValidationOptions);
    expect(validationResult.isValid).toBeFalsy();
    expect(validationResult.errors).toContain("Validation failed for property 'nestedProp': Value is not 'valid'.");
  });

  it('should pass with a valid array of nested objects', () => {
    const value = { nestedArray: ["valid"] };
    expect(validateNested(value, nestedValidationOptions).isValid).toBeTruthy();
  });

  it('should fail with an invalid array of nested objects', () => {
    const value = { nestedArray: ["invalid"] };
    const validationResult = validateNested(value, nestedValidationOptions);
    expect(validationResult.isValid).toBeFalsy();
    expect(validationResult.errors).toContain("Validation failed for property 'nestedArray' at index 0: Value is not 'valid'.");
  });
});


const stringStartsWithValidValidator: IValidator<string> = simpleValidatorFactory<string>({
  condition: value => value.startsWith('valid'),
  errorMessage: "String does not start with 'valid'."
});

const numberGreaterThanTenValidator: IValidator<number> = simpleValidatorFactory<number>({
  condition: value => value > 10,
  errorMessage: "Number is not greater than 10."
});

const arrayNotEmptyValidator: IValidator<any[]> = simpleValidatorFactory<any[]>({
  condition: value => value.length > 0,
  errorMessage: "Array is empty."
});

const complexValidator: IValidator<any> = combinedValidatorFactory([
  { validator: stringStartsWithValidValidator, typeGuard: (value: any): value is string => typeof value === 'string' },
  { validator: numberGreaterThanTenValidator, typeGuard: (value: any): value is number => typeof value === 'number' },
  { validator: arrayNotEmptyValidator, typeGuard: (value: any): value is any[] => Array.isArray(value) }
]);

describe('validateNested with complex structures', () => {

  const options: INestedValidationOptions<any> = {
    validator: complexValidator,
    validationOptions: {},
    each: true,
  };

  it('should validate complex nested structures', () => {
    const value = {
      stringProp: "validString",
      numberProp: 20,
      arrayProp: ["validElement"],
      nestedObject: {
        stringProp: "invalidString",
        numberProp: 5,
        arrayProp: [],
      },
    };

    const validationResult = validateNested(value, options);
    expect(validationResult.isValid).toBeFalsy();
    expect(validationResult.errors).toContain("Nested validation failed for 'nestedObject': Validation failed for property 'stringProp': String does not start with 'valid'.");
    expect(validationResult.errors).toContain("Nested validation failed for 'nestedObject': Validation failed for property 'numberProp': Number is not greater than 10.");
    expect(validationResult.errors).toContain("Nested validation failed for 'nestedObject': Validation failed for property 'arrayProp': Array is empty.");
  });
});

class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Product {
  name: string;
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
  condition: value => value instanceof User && value.name.startsWith('valid') && value.age > 18,
  errorMessage: "Value is not a valid User."
});

const isProductValidator: IValidator<any> = simpleValidatorFactory<any>({
  condition: value => value instanceof Product && value.name.startsWith('valid') && value.price > 10,
  errorMessage: "Value is not a valid Product."
});

const isOrderValidator: IValidator<any> = simpleValidatorFactory<any>({
  condition: value => value instanceof Order && value.user instanceof User && value.products.every(product => product instanceof Product),
  errorMessage: "Value is not a valid Order."
});

const complexClassValidator: IValidator<any> = combinedValidatorFactory([
  { validator: isUserValidator, typeGuard: (value: any): value is User => value instanceof User },
  { validator: isProductValidator, typeGuard: (value: any): value is Product => value instanceof Product },
  { validator: isOrderValidator, typeGuard: (value: any): value is Order => value instanceof Order },
]);

it('should validate very complex (class) nested structures', () => {
  const options: INestedValidationOptions<any> = {
    validator: complexClassValidator,
    validationOptions: {},
    each: true,
  };

  const value = {
    user: new User('validUser', 20),
    order: new Order(new User('validUser', 20), [new Product('validProduct', 15), new Product('validProduct', 15)]),
    products: [new Product('validProduct', 15), new Product('validProduct', 15)],
  };

  const validationResult = validateNested(value, options);
  expect(validationResult.isValid).toBeTruthy();
});

it('should fail validation for complex (class) nested structures', () => {
  const options: INestedValidationOptions<any> = {
    validator: complexClassValidator,
    validationOptions: {},
    each: true,
  };

  const value = {
    user: new User('invalidUser', 15),
    order: new Order(new User('invalidUser', 15), [new Product('invalidProduct', 5), new Product('invalidProduct', 5)]),
    products: [new Product('invalidProduct', 5), new Product('invalidProduct', 5)],
  };

  const validationResult = validateNested(value, options);
  expect(validationResult.isValid).toBeFalsy();
  
  // We expect the error to contain "Validation failed for property 'user': Value is not a valid User."
  // This means that the 'user' property of the main object failed validation.
  // In this case, the 'user' object has a name that does not start with 'valid' and an age less than 18, causing the validation to fail.
  expect(validationResult.errors).toContain("Validation failed for property 'user': Value is not a valid User.");

  // We expect the error to contain "Nested validation failed for 'order': Validation failed for property 'user': Value is not a valid User."
  // This means that the 'user' property of the 'order' object failed validation.
  // Just like before, the 'user' object has a name that does not start with 'valid' and an age less than 18.
  expect(validationResult.errors).toContain("Nested validation failed for 'order': Validation failed for property 'user': Value is not a valid User.");

  // We expect the error to contain "Nested validation failed for 'order': Validation failed for property 'products' at index 0: Value is not a valid Product."
  // This means that the first product (index 0) in the list of products of the 'order' object failed validation.
  // In this case, the product has a name that does not start with 'valid' and a price less than 10.
  expect(validationResult.errors).toContain("Nested validation failed for 'order': Validation failed for property 'products' at index 0: Value is not a valid Product.");

  // We expect the error to contain "Nested validation failed for 'order': Validation failed for property 'products' at index 1: Value is not a valid Product."
  // This means that the second product (index 1) in the list of products of the 'order' object failed validation.
  // Just like before, the product has a name that does not start with 'valid' and a price less than 10.
  expect(validationResult.errors).toContain("Nested validation failed for 'order': Validation failed for property 'products' at index 1: Value is not a valid Product.");

  // We expect the error to contain "Validation failed for property 'products' at index 0: Value is not a valid Product."
  // This means that the first product (index 0) in the list of products of the main object failed validation.
  // Just like before, the product has a name that does not start with 'valid' and a price less than 10.
  expect(validationResult.errors).toContain("Validation failed for property 'products' at index 0: Value is not a valid Product.");

  // We expect the error to contain "Validation failed for property 'products' at index 1: Value is not a valid Product."
  // This means that the second product (index 1) in the list of products of the main object failed validation.
  // Just like before, the product has a name that does not start with 'valid' and a price less than 10.
  expect(validationResult.errors).toContain("Validation failed for property 'products' at index 1: Value is not a valid Product.");
});

// Creamos un validador que acepta opciones
const isUserValidatorWithOptions: IValidator<any> = {
  validate: (value: any, options?: any): IValidationResult => {
    const isValid = value instanceof User && value.name.startsWith(options.prefix) && value.age > options.minAge;
    return {
      isValid,
      errors: isValid ? [] : ["Value is not a valid User."]
    };
  }
};

// Creamos un validador complejo que utiliza el validador con opciones
const complexClassValidatorWithOptions: IValidator<any> = combinedValidatorFactory([
  { validator: isUserValidatorWithOptions, typeGuard: (value: any): value is User => value instanceof User },
]);

// Creamos un test que utiliza el validador complejo con opciones
it('should validate with options', () => {
  const options: INestedValidationOptions<any> = {
    validator: complexClassValidatorWithOptions,
    validationOptions: { prefix: 'valid', minAge: 18 },
    each: true,
  };

  const value = {
    user: new User('validUser', 20)
  };

  const validationResult = validateNested(value, options);
  expect(validationResult.isValid).toBeTruthy();
});


// First, we define a validator with options to validate objects of type User.
// This validator expects the User object to have a name that starts with a specific prefix
// and the user's age to be greater than a minimum. These criteria are passed through the options.
const isProductValidatorWithOptions: IValidator<any> = {
  validate: (product: any, options?: any): IValidationResult => {
    const isValid = product instanceof Product && product.name.startsWith(options.prefix) && product.price > options.minPrice;
    return {
      isValid,
      errors: isValid ? [] : ["Value is not a valid Product."]
    };
  }
};

// Similarly, we define validators for Product and Order, each with their own rules.
// For example, for Product, we expect the product name to start with a specific prefix
// and the price to be greater than a minimum price. For Order, we check that the associated user and
// products pass their respective validations.
const isOrderValidatorWithOptions: IValidator<any> = {
  validate: (order: any, options?: any): IValidationResult => {
    const isUserValid = order.user instanceof User && order.user.name.startsWith(options.prefix) && order.user.age > options.minAge;
    const areProductsValid = Array.isArray(order.products) && order.products.every((product: Product) => product instanceof Product && product.name.startsWith(options.prefix) && product.price > options.minPrice);
    const isValid = order instanceof Order && isUserValid && areProductsValid;
    return {
      isValid,
      errors: isValid ? [] : ["Value is not a valid Order."]
    };
  }
};

// Combine all individual validators into a complex validator. This allows us to validate
// complex data structures that may include Users, Products, and Orders in a single call.
// The complex validator uses a 'typeGuard' to determine which specific validator to use based on
// the type of object being validated.
const complexClassValidatorWithOptions2: IValidator<any> = combinedValidatorFactory([
  { validator: isUserValidatorWithOptions, typeGuard: (value: any): value is User => value instanceof User },
  { validator: isProductValidatorWithOptions, typeGuard: (value: any): value is Product => value instanceof Product },
  { validator: isOrderValidatorWithOptions, typeGuard: (value: any): value is Order => value instanceof Order },
]);

// Define a test to validate a complex data structure that includes a User, Products, and an Order.
// This test simulates a real-world scenario where different types of objects with their own validation rules
// need to be validated together. The 'validationOptions' pass specific criteria (such as the prefix for names
// and the minimum age and price) that the validators use to determine if an object is valid or not.
it('should validate complex structures with options', () => {
  const validationOptions: INestedValidationOptions<any> = {
    validator: complexClassValidatorWithOptions2,
    validationOptions: { prefix: 'valid', minAge: 18, minPrice: 10 },
    each: true,
  };

  // Create a test object that represents a complex data structure,
  // including a User, multiple Products, and an Order. This object is what we want to validate.
  const complexValue = {
    user: new User('validUser', 25),
    products: [
      new Product('validProduct1', 20),
      new Product('validProduct2', 15)
    ],
    order: new Order(
      new User('validUserOrder', 22), 
      [
        new Product('validProductOrder1', 20),
        new Product('validProductOrder2', 15)
      ]
    )
  };

  // Perform the validation by calling 'validateNested' with our complex data structure
  // and the validation options. We expect the result to be valid ('isValid' = true),
  // which would mean that all objects within the data structure comply with the validation rules
  // defined in our validators.
  const validationResult = validateNested(complexValue, validationOptions);
  expect(validationResult.isValid).toBeTruthy();
});
