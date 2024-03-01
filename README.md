
# REST Data Validator

REST Data Validator is a versatile library designed to offer comprehensive validation for data in RESTful APIs. It supports a wide range of data types, validation rules, and is designed with extensibility in mind, making it ideal for ensuring data integrity and compliance with API specifications.

## Features

- **Comprehensive Validation**: Supports validation of strings, numbers, dates, enums, files, and custom formats.
- **Decorator-based Validation**: Utilizes TypeScript decorators for easy and declarative validation directly in your class models.
- **Flexible and Extensible**: Easily extendable to include custom validation rules and logic.
- **Framework Agnostic**: Can be used with any server-side framework or library, such as Express, Koa, or Fastify.
- **Full TypeScript Support**: Leverages TypeScript for type safety and enhanced developer experience.
- **Custom Error Messages**: Allows defining custom error messages for each validation rule to provide clear and specific feedback.

## Installation

```bash
npm install rest-data-validator
```

Or using Yarn:

```bash
yarn add rest-data-validator
```

## Usage

### Basic Example

Basic usage involves importing the validators and applying them to your data models:

```typescript
import { ClassValidator, String, Number, validate } from 'rest-data-validator';

@ClassValidator
class User {
    @String({ minLength: 3, maxLength: 30 })
    name: string;

    @Number({ min: 0 })
    age: number;
}

const user = new User();
user.name = "John Doe";
user.age = 25;

const validationResult = validate(user);
console.log(validationResult);
```

### Using Decorators for Validation

Decorators can be applied to class properties to specify the validation rules directly in the model definition:

```typescript
import { String, Number, Enum, ClassValidator, validate } from 'rest-data-validator';

enum Role { Admin, User, Guest }

@ClassValidator
class UserProfile {
    @String({ minLength: 2, maxLength: 100 })
    username: string;

    @Number({ min: 1, max: 100 })
    level: number;

    @Enum({ enum: Role })
    role: Role;
}

const profile = new UserProfile();
profile.username = "validator";
profile.level = 5;
profile.role = Role.User;

const result = validate(profile);
if (!result.isValid) {
    console.error(result.errors);
} else {
    console.log("Validation passed.");
}
```

### Custom Validation Rules

For more complex validation scenarios, custom validators can be created and used:

```typescript
import { ValidationResult, validateCustom } from 'rest-data-validator';

function customUsernameValidator(value: string): ValidationResult {
    const isValid = /^[a-zA-Z0-9]+$/.test(value);
    return {
        isValid,
        errors: isValid ? [] : ["Username must only contain alphanumeric characters."]
    };
}

const result = validateCustom("user123", customUsernameValidator);
console.log(result);
```

# ClassValidator Decorator

The `ClassValidator` decorator is used at the class level to enable validation of its properties using the decorators provided by the REST Data Validator library. This decorator is essential for activating and applying the defined property validators within a class.

## Usage

To use the `ClassValidator`, simply decorate your class with `@ClassValidator`. This signals the library to perform validation on the instance based on the property validators defined within the class.

### Example

```typescript
import { ClassValidator, StringValidator, NumberValidator } from 'rest-data-validator';

@ClassValidator
class User {
    @StringValidator({ minLength: 2, maxLength: 30 })
    name: string;

    @NumberValidator({ min: 18 })
    age: number;
}

const user = new User();
user.name = "Jane Doe";
user.age = 25;

// Perform validation
const validationResult = validate(user);
if (validationResult.isValid) {
    console.log("User is valid.");
} else {
    console.error("Validation errors:", validationResult.errors);
}
```

In this example, the `User` class is decorated with `@ClassValidator`, which enables validation for the `name` and `age` properties using the `StringValidator` and `NumberValidator`, respectively. The `validate` function is then used to check if the user instance meets the specified validation criteria.

### Integrating with Application Logic

The `ClassValidator` decorator and associated property validators can be integrated into application logic to ensure data integrity before processing or persisting data, such as before saving a user to a database or before performing operations that depend on valid data.

By using `ClassValidator`, developers can define a clear, declarative validation schema directly within their class models, improving maintainability, readability, and reducing the likelihood of invalid data being processed by the application.

# StringValidator Decorator

El decorador `StringValidator` se utiliza para aplicar validaciones a propiedades de cadena dentro de clases en TypeScript, asegurando que los datos cumplan con ciertos criterios especificados antes de ser procesados o almacenados.

## Propiedades

- **minLength**: `number` - Especifica la longitud mínima que debe tener la cadena.
- **maxLength**: `number` - Define la longitud máxima permitida para la cadena.
- **regexPattern**: `RegExp` - Un patrón de expresión regular que la cadena debe cumplir.

## Uso

Para usar el decorador `StringValidator`, primero debes asegurarte de que tu proyecto esté configurado para utilizar decoradores en TypeScript.

### Ejemplo Básico

```typescript
import { ClassValidator, StringValidator } from 'rest-data-validator';

@ClassValidator
class Post {
    @StringValidator({ minLength: 10, maxLength: 100 })
    title: string;

    @StringValidator({ regexPattern: /^[a-zA-Z0-9 ]+$/ })
    content: string;
}
```

En este ejemplo, `title` debe tener entre 10 y 100 caracteres, mientras que `content` debe cumplir con el patrón especificado y no puede estar vacío.

# NumberValidator Decorator

El decorador `NumberValidator` se utiliza para aplicar validaciones a propiedades numéricas dentro de clases en TypeScript, asegurando que los datos cumplan con ciertos criterios especificados antes de ser procesados o almacenados.

## Propiedades

- **min**: `number` - Especifica el valor mínimo que debe tener el número.
- **max**: `number` - Define el valor máximo permitido para el número.
- **integerOnly**: `boolean` - Indica si solo se permiten números enteros (`true`) o si se permiten números flotantes (`false`).
- **positiveOnly**: `boolean` - Indica si solo se permiten números positivos.
- **negativeOnly**: `boolean` - Indica si solo se permiten números negativos.
- **divisibleBy**: `number` - Especifica un valor por el cual el número debe ser divisible.

## Uso

Para usar el decorador `NumberValidator`, simplemente decora las propiedades numéricas de tus clases con las restricciones deseadas.

### Ejemplo Básico

```typescript
import { ClassValidator, NumberValidator } from 'rest-data-validator';

@ClassValidator
class Product {
    @NumberValidator({ min: 0 })
    price: number;

    @NumberValidator({ integerOnly: true, min: 1 })
    stock: number;
}
```

En este ejemplo, `price` debe ser un número no negativo, mientras que `stock` debe ser un número entero positivo.

### Validación de Números Divisibles

```typescript
@ClassValidator
class Measurement {
    @NumberValidator({ divisibleBy: 0.5 })
    length: number;
}
```

Aquí, `length` debe ser un número divisible por 0.5, permitiendo valores como 1.5, 2.0, 2.5, etc.

# DateValidator Decorator

The `DateValidator` decorator is used to apply validations to date properties within classes in TypeScript, ensuring that the data meets specified criteria before being processed or stored.

## Properties

- **before**: `Date` - Specifies the latest date that is considered valid.
- **after**: `Date` - Specifies the earliest date that is considered valid.
- **format**: `string` - Specifies the expected format of the date string (useful when validating string representations of dates).

## Usage

To use the `DateValidator` decorator, simply decorate your class's date properties with the desired constraints.

### Basic Example

```typescript
import { ClassValidator, DateValidator } from 'rest-data-validator';

@ClassValidator
class Event {
    @DateValidator({ after: new Date('2020-01-01'), before: new Date('2023-01-01') })
    eventDate: Date;
}
```

In this example, `eventDate` must fall between January 1st, 2020, and January 1st, 2023.

### Validating Date Strings

```typescript
@ClassValidator
class Appointment {
    @DateValidator({ format: 'YYYY-MM-DD' })
    date: string;
}
```

Here, `date` must be a string that matches the specified format, `YYYY-MM-DD`.

# EnumValidator Decorator

The `EnumValidator` decorator is designed to validate that the value of a property matches one of the values defined in a TypeScript enumeration. It ensures that your data conforms to specified enum constraints, enhancing type safety and data integrity in your applications.

## Properties

- **enum**: `object` - The enumeration that the property value must be a part of.
- **message**: `string` - Optional. A custom error message to be returned if the validation fails.

## Usage

To use the `EnumValidator`, apply it to properties in your class that are meant to hold values defined by specific TypeScript enums.

### Example

Suppose you have an enum representing user roles:

```typescript
enum UserRole {
    Admin = 'admin',
    User = 'user',
    Guest = 'guest'
}
```

You can use `EnumValidator` to ensure that a user role property only accepts values defined in `UserRole`:

```typescript
import { ClassValidator, EnumValidator } from 'rest-data-validator';

@ClassValidator
class User {
    @EnumValidator({ enum: UserRole })
    role: UserRole;
}
```

In this example, the `role` property must be one of the values specified in the `UserRole` enum. Attempting to assign any value not included in the enum will result in a validation error.

### Custom Error Messages

You can also specify a custom error message to be used if the validation fails:

```typescript
@EnumValidator({ enum: UserRole, message: 'Invalid user role' })
role: UserRole;
```

This will replace the default error message with "Invalid user role" if an invalid value is assigned to the `role` property.

# FileValidator Decorator

The `FileValidator` decorator is designed to validate file properties in your classes, ensuring that the files meet specified constraints such as type, size, and name criteria. This is particularly useful for applications that handle file uploads and need to enforce validation rules for security and data integrity.

## Properties

- **mimeTypes**: `string[]` - Specifies the allowed MIME types for the file.
- **maxSize**: `number` - Specifies the maximum file size in bytes.
- **minSize**: `number` - Specifies the minimum file size in bytes.
- **allowedExtensions**: `string[]` - Specifies the allowed file extensions.
- **disallowedExtensions**: `string[]` - Specifies the disallowed file extensions.
- **validateFileName**: `(fileName: string) => boolean` - A custom function to validate the file name.
- **validateFileContent**: `(fileBuffer: Buffer) => boolean` - A custom function to validate the file content.

## Usage

To use the `FileValidator`, apply it to properties in your class that are intended to hold file data. The validation can be customized extensively using the properties outlined above.

### Example

```typescript
import { ClassValidator, FileValidator } from 'rest-data-validator';

@ClassValidator
class UserProfile {
    @FileValidator({
        mimeTypes: ['image/jpeg', 'image/png'],
        maxSize: 5 * 1024 * 1024, // 5 MB
        allowedExtensions: ['.jpg', '.jpeg', '.png'],
        validateFileName: (name) => !name.includes(' '),
        validateFileContent: (buffer) => buffer.length > 0
    })
    avatar: Buffer;
}
```

In this example, the `avatar` property must be a file that is either a JPEG or PNG image, no larger than 5MB, with an extension of `.jpg`, `.jpeg`, or `.png`, and the file name must not include spaces. Additionally, the file must not be empty.

### Custom File Content Validation

You can provide a custom function to validate the content of the file based on your specific requirements:

```typescript
validateFileContent: (buffer) => {
    // Implement custom validation logic, for example:
    return buffer.includes(someExpectedByteSequence);
}
```

This allows for fine-grained control over what constitutes a valid file beyond the basic constraints of type and size.

# RangeValidator Decorator

The `RangeValidator` decorator is designed to validate numerical or date properties within classes, ensuring they fall within a specified range. This decorator is versatile, supporting both numbers and dates, making it ideal for a wide variety of validation scenarios.

## Properties

- **min**: `number | Date` - Specifies the minimum allowed value or date.
- **max**: `number | Date` - Specifies the maximum allowed value or date.
- **inclusive**: `boolean` - Determines whether the range includes the `min` and `max` values (inclusive) or not (exclusive).
- **step**: `number` - For numerical values, specifies the step interval between valid values.
- **dateFormat**: `string` - For date values, specifies the expected format of the date string.
- **customValidator**: `(value: number | Date) => boolean` - Allows for a custom validation function.

## Usage

To use the `RangeValidator`, apply it to numerical or date properties in your classes, specifying the desired range and other criteria.

### Example for Numbers

```typescript
import { ClassValidator, RangeValidator } from 'rest-data-validator';

@ClassValidator
class Product {
    @RangeValidator({ min: 0, max: 100, step: 10, inclusive: true })
    discountPercentage: number;
}
```

In this example, `discountPercentage` must be a number between 0 and 100, inclusive, and it must be a multiple of 10.

### Example for Dates

```typescript
@ClassValidator
class Event {
    @RangeValidator({ min: new Date('2020-01-01'), max: new Date('2023-01-01'), inclusive: true })
    eventDate: Date;
}
```

Here, `eventDate` must fall between January 1, 2020, and January 1, 2023, inclusive.

### Custom Validation

```typescript
@RangeValidator({
    min: 10,
    max: 20,
    customValidator: (value) => value % 2 === 0 // Must be even
})
value: number;
```

This allows for additional custom validation logic, such as ensuring a number is even within a specified range.

# RegexValidator Decorator

The `RegexValidator` decorator allows for the validation of string properties against a specified regular expression pattern. This ensures that the property value conforms to a specific format, making it incredibly useful for validating emails, phone numbers, URLs, and more.

## Properties

- **pattern**: `RegExp` - The regular expression pattern the string must match.
- **flags**: `string` - Optional flags to apply to the pattern, such as 'i' for case-insensitive matching.
- **message**: `string` - A custom error message to return if the validation fails.
- **invertMatch**: `boolean` - If set to `true`, the validation succeeds only if the string does NOT match the pattern.
- **testAgainstTrimmedValue**: `boolean` - Determines whether to test the trimmed value of the string.
- **allowEmptyString**: `boolean` - Determines whether an empty string should be considered a valid value.

## Usage

To use the `RegexValidator`, apply it to any string property in your class that needs to match a specific pattern.

### Example

```typescript
import { ClassValidator, RegexValidator } from 'rest-data-validator';

@ClassValidator
class User {
    @RegexValidator({ pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email format' })
    email: string;
}
```

In this example, the `email` property must match the specified pattern, ensuring it follows a valid email format.

### Inverting Match

```typescript
@RegexValidator({ pattern: /example/, invertMatch: true, message: 'Value must not contain "example"' })
value: string;
```

This configuration ensures that the validation passes only if the string does not contain the word "example".

### Testing Against Trimmed Value

```typescript
@RegexValidator({ pattern: /^\d+$/, testAgainstTrimmedValue: true })
value: string;
```

This ensures that the string, when trimmed, consists only of digits, making it suitable for numeric IDs or codes that might have accidental whitespace.

# CustomValidator Decorator

The `CustomValidator` decorator provides a powerful way to define custom validation logic for properties within your classes. This decorator allows for the utmost flexibility by enabling the use of any validation function that you define, catering to complex or unique validation requirements that are not covered by the standard validators.

## Properties

- **validatorFunction**: `(value: any) => boolean | ValidationResult` - A custom function that takes the property value as input and returns either a boolean indicating validity or a `ValidationResult` object.
- **message**: `string` - Optional. A custom error message to return if the validation fails.

## Usage

To use the `CustomValidator`, apply it to any property in your class and provide a validation function that implements your specific validation logic.

### Example

```typescript
import { ClassValidator, CustomValidator, ValidationResult } from 'rest-data-validator';

@ClassValidator
class Product {
    @CustomValidator({
        validatorFunction: (value: any): ValidationResult => {
            const isValid = value > 0 && value < 100;
            return {
                isValid,
                errors: isValid ? [] : ['The value must be between 1 and 99.']
            };
        }
    })
    price: number;
}
```

In this example, the `price` property must be a number between 1 and 99. The custom validation function checks this condition and returns a `ValidationResult`.

### Using Boolean Return Value

For simpler cases, the validator function can return a boolean value:

```typescript
@CustomValidator({
    validatorFunction: (value: string) => value.startsWith('A'),
    message: 'The value must start with the letter A.'
})
value: string;
```

This configuration ensures that the validation passes only if the string starts with the letter 'A'.

The `CustomValidator` is particularly useful for implementing validations that require checking against external data sources, complex logical conditions, or patterns that are not easily expressed through regular expressions.

# DomainValidator Decorator

The `DomainValidator` decorator is specifically designed for validating domain-related properties in your classes, such as email addresses, URLs, and domain names, ensuring they adhere to standard formats and constraints.

## Properties

- **type**: `string` - Specifies the type of domain validation to perform. Possible values include 'email', 'url', and 'hostname'.
- **allowSubdomains**: `boolean` - Determines whether subdomains are allowed for URL and hostname validations.
- **allowTopLevelDomains**: `boolean` - Determines whether top-level domains (TLDs) are allowed without a subdomain.
- **topLevelDomains**: `string[]` - Specifies a whitelist of acceptable top-level domains.
- **message**: `string` - Optional. A custom error message to return if the validation fails.

## Usage

To use the `DomainValidator`, apply it to properties in your class that represent domain-related information, specifying the appropriate validation type and any additional constraints.

### Example for Email Validation

```typescript
import { ClassValidator, DomainValidator } from 'rest-data-validator';

@ClassValidator
class ContactForm {
    @DomainValidator({ type: 'email', message: 'Invalid email address' })
    emailAddress: string;
}
```

In this example, the `emailAddress` property must be a valid email address. The custom message 'Invalid email address' is returned if the validation fails.

### Example for URL Validation

```typescript
@ClassValidator
class WebPage {
    @DomainValidator({ type: 'url', allowSubdomains: true })
    websiteUrl: string;
}
```

Here, the `websiteUrl` property must be a valid URL. Subdomains are allowed in this validation scenario.

### Customizing Top-Level Domains

```typescript
@DomainValidator({ type: 'email', topLevelDomains: ['com', 'net', 'org'] })
email: string;
```

This configuration restricts valid email addresses to those that have a top-level domain of 'com', 'net', or 'org'.

The `DomainValidator` is an essential tool for ensuring that user input conforms to expected domain formats, enhancing the reliability and security of domain-related data processing in your application.

# ArrayValidator Decorator

The `ArrayValidator` decorator allows for the validation of array properties within classes, ensuring they meet specific criteria such as length and uniqueness, and even applying custom validation to each element.

## Properties

- **minLength**: `number` - Specifies the minimum length the array must have.
- **maxLength**: `number` - Defines the maximum length allowed for the array.
- **unique**: `boolean` - Ensures all elements in the array are unique.
- **validator**: `ValidatorFunction<T>` - A custom validation function to apply to each element in the array.

## Usage

To use the `ArrayValidator`, apply it to array properties in your class, specifying the desired validation constraints.

### Example

```typescript
import { ClassValidator, ArrayValidator } from 'rest-data-validator';

@ClassValidator
class ShoppingCart {
    @ArrayValidator({
        minLength: 1,
        unique: true,
        validator: (item) => {
            // Custom validation logic for each item
            return item.price > 0 ? { isValid: true } : { isValid: false, errors: ['Price must be greater than 0'] };
        }
    })
    items: Array<{id: number, price: number}>;
}
```

In this example, the `items` array must have at least one item, each item must be unique, and every item must satisfy the custom validation condition (price greater than 0).

### Applying ArrayValidator

To apply the `ArrayValidator`, you need to decorate your class property with `@ArrayValidator` and provide the necessary validation options. This enables a declarative approach to specifying validation logic directly within your class models.

The `ArrayValidator` is a powerful tool for ensuring data integrity for array properties, supporting both simple constraints and complex, element-wise validation.

## Contributing

Contributions are welcome! Please read our contributing guide for details on our code of conduct, and the process for submitting pull requests to us.

## Author

- **Sean Luis Guada Rodriguez** - [Visit Website](https://sean-rodriguez.vercel.app)

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.
