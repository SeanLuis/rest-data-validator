# REST Data Validator

![Jest Coverage](https://img.shields.io/badge/Jest%20Coverage-97.25%25-success?style=flat)
[![Codecov](https://codecov.io/gh/SeanLuis/rest-data-validator/graph/badge.svg?token=rhWlGJspdW)](https://codecov.io/gh/SeanLuis/rest-data-validator)
[![Package Build](https://github.com/SeanLuis/rest-data-validator/actions/workflows/build.yml/badge.svg)](https://github.com/SeanLuis/rest-data-validator/actions/workflows/build.yml)
[![Version](https://badge.fury.io/js/rest-data-validator.svg)](https://badge.fury.io/js/rest-data-validator)

REST Data Validator is a versatile library designed to offer comprehensive validation for data in RESTful APIs. It supports a wide range of data types, validation rules, and is designed with extensibility in mind, making it ideal for ensuring data integrity and compliance with API specifications.

## Features

- **Comprehensive Validation**: Supports validation of strings, numbers, emails, dates, enums, files, and custom formats.
- **Decorator-based Validation**: Utilizes TypeScript decorators for easy and declarative validation directly in your class models.
- **Flexible and Extensible**: Easily extendable to include custom validation rules and logic.
- **Framework Agnostic**: Can be used with any server-side framework or library, such as Express, Koa, or Fastify.
- **Full TypeScript Support**: Leverages TypeScript for type safety and enhanced developer experience.
- **Custom Error Messages**: Allows defining custom error messages for each validation rule to provide clear and specific feedback.

# REST Data Validator

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Example](#basic-example)
  - [Using Decorators for Validation](#using-decorators-for-validation)
  - [Custom Validation Rules](#custom-validation-rules)
- [Validators and Decorators](#validators-and-decorators)
  - [Class Decorator](#classvalidator-decorator)
  - [Validation Decorators](#validation-decorators)
    - [String Decorator](#string-decorator)
    - [Number Decorator](#number-decorator)
    - [Email Decorator](#email-decorator)
    - [Password Decorator](#password-decorator)
    - [Date Decorator](#date-decorator)
    - [Enum Decorator](#enum-decorator)
    - [File Decorator](#file-decorator)
    - [Range Decorator](#range-decorator)
    - [Regex Decorator](#regex-decorator)
    - [Custom Decorator](#custom-decorator)
    - [Domain Decorator](#domain-decorator)
    - [Array Decorator](#array-decorator)
    - [Nested Decorator](#nested-decorator)
    - [Contextual Decorator](#contextual-decorator)
  - [Sanitizer Functions](#sanitizer-functions)
  - Validation Utilities
    - [Async Validators](#async-validators)
    - [Nested Validators](#nested-validators)
    - [Contextual Validators](#contextual-validators)
    - [Dependency Validators](#dependency-validators)
      - [1. Dependency Decorator](#1-dependency-decorator)
          - [1.1 Introduction](#11-introduction)
          - [1.2 Usage](#12-usage)
          - [1.3 Example](#13-example)
      - [2. Dependency Function](#2-dependency-function)
          - [2.1 Introduction](#21-introduction)
          - [2.2 Usage](#22-usage)
          - [2.3 Example](#23-example)
      - [3. Separating Validation Logic in a Clean Architecture Approach](#3-separating-validation-logic-in-a-clean-architecture-approach)
  - Decorators Utility
    - [Accessors Decorator](#accessors-decorator)
    - [Getter Decorator](#getter-decorator)
    - [Setter Decorator](#setter-decorator)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Support Us](#support-us)
- [Author](#author)
- [License](#license)

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
import { ClassValidator, String, Number, validate } from "rest-data-validator";

@ClassValidator
class User {
  @String({ minLength: 3, maxLength: 30 })
  name: string;

  @Number({ min: 18 })
  age: number;
}

const user = new User();
user.name = "John Doe";
user.age = 25;

// It would return true since the conditions are met, otherwise it would throw an exception.

// And using the validator manually
const beforeDate = new Date("2024-12-31");
const afterDate = new Date("2020-01-01");

const options = { before: beforeDate, after: afterDate };
const validDateString = "2022-06-15";
const validationResult = validateDate(validDateString, options).isValid;

console.log(validationResult); // false;
```

### Using Decorators for Validation

Decorators can be applied to class properties to specify the validation rules directly in the model definition:

```typescript
import {
  String,
  Number,
  Enum,
  ClassValidator,
  validate,
} from "rest-data-validator";

enum Role {
  Admin,
  User,
  Guest,
}

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
```

### Custom Validation Rules

For more complex validation scenarios, custom validators can be created and used:

```typescript
import { ValidationResult, validateCustom } from "rest-data-validator";

function customUsernameValidator(value: string): ValidationResult {
  const isValid = /^[a-zA-Z0-9]+$/.test(value);
  return {
    isValid,
    errors: isValid
      ? []
      : ["Username must only contain alphanumeric characters."],
  };
}

const result = validateCustom("user123", customUsernameValidator);
console.log(result);
```

# Class Decorator

The `ClassValidator` decorator is used at the class level to enable validation of its properties using the decorators provided by the REST Data Validator library. This decorator is essential for activating and applying the defined property validators within a class.

## Usage

To use the `ClassValidator`, simply decorate your class with `@ClassValidator`. This signals the library to perform validation on the instance based on the property validators defined within the class.

### Example

```typescript
import {
  ClassValidator,
  StringValidator,
  NumberValidator,
} from "rest-data-validator";

@ClassValidator
class User {
  @String({ minLength: 2, maxLength: 30 })
  name: string;

  @Number({ min: 18 })
  age: number;
}

const user = new User();
user.name = "Jane Doe";
user.age = 25;
```

In this example, the `User` class is decorated with `@ClassValidator`, which enables validation for the `name` and `age` properties using the `StringValidator` and `NumberValidator`, respectively. The `validate` function contained within ValidationUtils used by ClassValidator to check if the user instance meets the specified validation criteria.

### Integrating with Application Logic

The `ClassValidator` decorator and associated property validators can be integrated into application logic to ensure data integrity before processing or persisting data, such as before saving a user to a database or before performing operations that depend on valid data.

By using `ClassValidator`, developers can define a clear, declarative validation schema directly within their class models, improving maintainability, readability, and reducing the likelihood of invalid data being processed by the application.

# String Decorator

The `String` decorator is used to apply validations to string properties within classes in TypeScript, ensuring that data meets certain specified criteria before being processed or stored.

## Properties

- **minLength**: `number` - Specifies the minimum length the string must be.
- **maxLength**: `number` - Defines the maximum length allowed for the string.
- **regexPattern**: `RegExp` - A regular expression pattern that the string must conform to.

## Usage

To use the `String` decorator, you must first make sure your project is configured to use decorators in TypeScript.

### Basic Example

```typescript
import { ClassValidator, String } from "rest-data-validator";

@ClassValidator
class Post {
  @String({ minLength: 10, maxLength: 100 })
  title: string;

  @String({ regexPattern: /^[a-zA-Z0-9 ]+$/ })
  content: string;
}
```

In this example, `title` must be between 10 and 100 characters, while `content` must match the specified pattern and cannot be empty.

# Number Decorator

The `Number` decorator is used to apply validations to numerical properties within classes in TypeScript, ensuring that data meets certain specified criteria before being processed or stored.

## Properties

- **min**: `number` - Specifies the minimum value that the number must have.
- **max**: `number` - Defines the maximum value allowed for the number.
- **integerOnly**: `boolean` - Indicates whether only integers are allowed (`true`) or float numbers are allowed (`false`).
- **positiveOnly**: `boolean` - Indicates whether only positive numbers are allowed.
- **negativeOnly**: `boolean` - Indicates whether only negative numbers are allowed.
- **divisibleBy**: `number` - Specifies a value by which the number must be divisible.

## Usage

To use the `NumberValidator` decorator, simply decorate the numeric properties of your classes with the desired constraints.

### Basic Example

```typescript
import { ClassValidator, Number } from "rest-data-validator";

@ClassValidator
class Product {
  @Number({ min: 0 })
  price: number;

  @Number({ integerOnly: true, min: 1 })
  stock: number;
}
```

In this example, `price` must be a non-negative number, while `stock` must be a positive integer.

## Validation of Divisible Numbers

```typescript
@ClassValidator
class Measurement {
  @Number({ divisibleBy: 0.5 })
  length: number;
}
```
Here, `length` must be a number divisible by 0.5, allowing values like 1.5, 2.0, 2.5, etc.

# Email Decorator

The Email decorator is utilized to enforce validation on string properties that are expected to represent email addresses within classes in TypeScript. This ensures that the email addresses conform to a specified format or standard pattern before they are processed or stored.

## Properties

- **regexPattern**: `RegExp` - An optional regular expression pattern that the email string must match. If not provided, a default email validation pattern is used.
  
## Usage

To leverage the Email decorator, ensure your TypeScript project is set up to utilize decorators. The Email decorator can be used without any parameters for standard email validation or with a regexPattern to specify a custom validation pattern.

### Example

```typescript
import { ClassValidator, Email } from "rest-data-validator";

@ClassValidator
class UserProfile {
  @Email()
  email: string;
}

@ClassValidator
class CustomEmailProfile {
  @Email({ regexPattern: RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$') })
  email: string;
}
```

In the first example, the email field in the UserProfile class is validated against a default pattern to ensure it represents a valid email address.
In the second one, the email field must match the custom pattern provided, offering flexibility for different use cases or stricter validation requirements.

# Password Decorator

The Password decorator is used to enforce validation on string properties that are intended to be used as passwords within classes in TypeScript. This ensures that the passwords adhere to specified security requirements before they are processed or stored.

## Properties

- **minLength**: `number` - Specifies the minimum length the password must be.
- **maxLength**: `number` - Specifies the maximum length the password can be.
- **mustContainLowercase**: `boolean` - Specifies whether the password must contain at least one lowercase letter.
- **mustContainUppercase**: `boolean` - Specifies whether the password must contain at least one uppercase letter.
- **mustContainNumber**: `boolean` - Specifies whether the password must contain at least one numeric character.
- **mustContainSpecialCharacter**: `boolean` - Specifies whether the password must contain at least one special character.
- **regexPattern**: `RegExp` - An optional regular expression pattern the password string must match. If not provided, basic character type validations are used.

## Usage

To utilize the Password decorator, ensure your TypeScript project is configured to use decorators. The Password decorator can be applied without any parameters for general password validation or with properties specified to enforce custom validation rules.

### Example

```typescript
import { ClassValidator, Password } from "rest-data-validator";

@ClassValidator
class UserAccount {
  @Password()
  password: string;
}

@ClassValidator
class SecureUserAccount {
  @Password({
    minLength: 8,
    maxLength: 20,
    mustContainLowercase: true,
    mustContainUppercase: true,
    mustContainNumber: true,
    mustContainSpecialCharacter: true,
    regexPattern: RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$')
  })
  password: string;
}
```

In the first example, the password field in the UserAccount class is validated against general password requirements. In the second example, the password field in the SecureUserAccount class must satisfy the specific security criteria provided, offering enhanced flexibility and security for diverse application needs.

# Date Decorator

The `Date` decorator is used to apply validations to date properties within classes in TypeScript, ensuring that the data meets specified criteria before being processed or stored.

## Properties

- **before**: `Date` - Specifies the latest date that is considered valid.
- **after**: `Date` - Specifies the earliest date that is considered valid.
- **format**: `string` - Specifies the expected format of the date string (useful when validating string representations of dates).

## Usage

To use the `Date` decorator, simply decorate your class's date properties with the desired constraints.

### Basic Example

```typescript
import { ClassValidator, Date } from "rest-data-validator";

@ClassValidator
class Event {
  @Date({
    after: new Date("2020-01-01"),
    before: new Date("2023-01-01"),
  })
  eventDate: Date;
}
```

In this example, `eventDate` must fall between January 1st, 2020, and January 1st, 2023.

### Validating Date Strings

```typescript
@ClassValidator
class Appointment {
  @Date({ format: "YYYY-MM-DD" })
  date: string;
}
```

Here, `date` must be a string that matches the specified format, `YYYY-MM-DD`.

# Enum Decorator

The `Enum` decorator is designed to validate that the value of a property matches one of the values defined in a TypeScript enumeration. It ensures that your data conforms to specified enum constraints, enhancing type safety and data integrity in your applications.

## Properties

- **enum**: `object` - The enumeration that the property value must be a part of.
- **message**: `string` - Optional. A custom error message to be returned if the validation fails.

## Usage

To use the `Enum`, apply it to properties in your class that are meant to hold values defined by specific TypeScript enums.

### Example

Suppose you have an enum representing user roles:

```typescript
enum UserRole {
  Admin = "admin",
  User = "user",
  Guest = "guest",
}
```

You can use `Enum` to ensure that a user role property only accepts values defined in `UserRole`:

```typescript
import { ClassValidator, Enum } from "rest-data-validator";

@ClassValidator
class User {
  @Enum({ enum: UserRole })
  role: UserRole;
}
```

In this example, the `role` property must be one of the values specified in the `UserRole` enum. Attempting to assign any value not included in the enum will result in a validation error.

### Custom Error Messages

You can also specify a custom error message to be used if the validation fails:

```typescript
@Enum({ enum: UserRole, message: 'Invalid user role' })
role: UserRole;
```

This will replace the default error message with "Invalid user role" if an invalid value is assigned to the `role` property.

# File Decorator

The `File` decorator is designed to validate file properties in your classes, ensuring that the files meet specified constraints such as type, size, and name criteria. This is particularly useful for applications that handle file uploads and need to enforce validation rules for security and data integrity.

## Properties

- **mimeTypes**: `string[]` - Specifies the allowed MIME types for the file.
- **maxSize**: `number` - Specifies the maximum file size in bytes.
- **minSize**: `number` - Specifies the minimum file size in bytes.
- **allowedExtensions**: `string[]` - Specifies the allowed file extensions.
- **disallowedExtensions**: `string[]` - Specifies the disallowed file extensions.
- **validateFileName**: `(fileName: string) => boolean` - A custom function to validate the file name.
- **validateFileContent**: `(fileBuffer: Buffer) => boolean` - A custom function to validate the file content.

## Usage

To use the `File`, apply it to properties in your class that are intended to hold file data. The validation can be customized extensively using the properties outlined above.

### Example

```typescript
import { ClassValidator, File } from "rest-data-validator";

@ClassValidator
class UserProfile {
  @File({
    mimeTypes: ["image/jpeg", "image/png"],
    maxSize: 5 * 1024 * 1024, // 5 MB
    allowedExtensions: [".jpg", ".jpeg", ".png"],
    validateFileName: (name) => !name.includes(" "),
    validateFileContent: (buffer) => buffer.length > 0,
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
};
```

This allows for fine-grained control over what constitutes a valid file beyond the basic constraints of type and size.

# Range Decorator

The `Range` decorator is designed to validate numerical or date properties within classes, ensuring they fall within a specified range. This decorator is versatile, supporting both numbers and dates, making it ideal for a wide variety of validation scenarios.

## Properties

- **min**: `number | Date` - Specifies the minimum allowed value or date.
- **max**: `number | Date` - Specifies the maximum allowed value or date.
- **inclusive**: `boolean` - Determines whether the range includes the `min` and `max` values (inclusive) or not (exclusive).
- **step**: `number` - For numerical values, specifies the step interval between valid values.
- **dateFormat**: `string` - For date values, specifies the expected format of the date string.
- **customValidator**: `(value: number | Date) => boolean` - Allows for a custom validation function.

## Usage

To use the `Range`, apply it to numerical or date properties in your classes, specifying the desired range and other criteria.

### Example for Numbers

```typescript
import { ClassValidator, Range } from "rest-data-validator";

@ClassValidator
class Product {
  @Range({ min: 0, max: 100, step: 10, inclusive: true })
  discountPercentage: number;
}
```

In this example, `discountPercentage` must be a number between 0 and 100, inclusive, and it must be a multiple of 10.

### Example for Dates

```typescript
@ClassValidator
class Event {
  @Range({
    min: new Date("2020-01-01"),
    max: new Date("2023-01-01"),
    inclusive: true,
  })
  eventDate: Date;
}
```

Here, `eventDate` must fall between January 1, 2020, and January 1, 2023, inclusive.

### Custom Validation

```typescript
@Range({
    min: 10,
    max: 20,
    customValidator: (value) => value % 2 === 0 // Must be even
})
value: number;
```

This allows for additional custom validation logic, such as ensuring a number is even within a specified range.

# Regex Decorator

The `Regex` decorator allows for the validation of string properties against a specified regular expression pattern. This ensures that the property value conforms to a specific format, making it incredibly useful for validating emails, phone numbers, URLs, and more.

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
import { ClassValidator, Regex } from "rest-data-validator";

@ClassValidator
class User {
  @Regex({
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Invalid email format",
  })
  email: string;
}
```

In this example, the `email` property must match the specified pattern, ensuring it follows a valid email format.

### Inverting Match

```typescript
@Regex({ pattern: /example/, invertMatch: true, message: 'Value must not contain "example"' })
value: string;
```

This configuration ensures that the validation passes only if the string does not contain the word "example".

### Testing Against Trimmed Value

```typescript
@Regex({ pattern: /^\d+$/, testAgainstTrimmedValue: true })
value: string;
```

This ensures that the string, when trimmed, consists only of digits, making it suitable for numeric IDs or codes that might have accidental whitespace.

# Custom Decorator

The `Custom` decorator provides a powerful way to define custom validation logic for properties within your classes. This decorator allows for the utmost flexibility by enabling the use of any validation function that you define, catering to complex or unique validation requirements that are not covered by the standard validators.

## Properties

- **name**: `string` - The name of the custom validator.
- **validate**: `(value: any) => boolean` - A custom function that takes the property value as input and returns a boolean indicating validity.

## Usage

To use the `Custom` decorator, apply it to any property in your class and provide a validation function that implements your specific validation logic.

### Example

```typescript
import { ClassValidator, Custom } from "rest-data-validator";

@ClassValidator
class Product {
  @Custom({
    name: "PriceValidator",
    validate: (value: any): boolean => {
      return value > 0 && value < 100;
    },
  })
  price: number;
}
```

# Domain Decorator

The `Domain` decorator is specifically designed for validating domain-related properties in your classes, such as email addresses, URLs, and domain names, ensuring they adhere to standard formats and constraints.

## Properties

- **type**: `string` - Specifies the type of domain validation to perform. Possible values include 'email', 'url', and 'hostname'.
- **allowSubdomains**: `boolean` - Determines whether subdomains are allowed for URL and hostname validations.
- **allowTopLevelDomains**: `boolean` - Determines whether top-level domains (TLDs) are allowed without a subdomain.
- **topLevelDomains**: `string[]` - Specifies a whitelist of acceptable top-level domains.
- **message**: `string` - Optional. A custom error message to return if the validation fails.

## Usage

To use the `Domain`, apply it to properties in your class that represent domain-related information, specifying the appropriate validation type and any additional constraints.

### Example for Email Validation

```typescript
import { ClassValidator, Domain } from "rest-data-validator";

@ClassValidator
class ContactForm {
  @Domain({ type: "email", message: "Invalid email address" })
  emailAddress: string;
}
```

In this example, the `emailAddress` property must be a valid email address. The custom message 'Invalid email address' is returned if the validation fails.

### Example for URL Validation

```typescript
@ClassValidator
class WebPage {
  @Domain({ type: "url", allowSubdomains: true })
  websiteUrl: string;
}
```

Here, the `websiteUrl` property must be a valid URL. Subdomains are allowed in this validation scenario.

### Customizing Top-Level Domains

```typescript
@Domain({ type: 'email', topLevelDomains: ['com', 'net', 'org'] })
email: string;
```

This configuration restricts valid email addresses to those that have a top-level domain of 'com', 'net', or 'org'.

The `DomainValidator` is an essential tool for ensuring that user input conforms to expected domain formats, enhancing the reliability and security of domain-related data processing in your application.

# Array Decorator

The `Array` decorator allows for the validation of array properties within classes, ensuring they meet specific criteria such as length and uniqueness, and even applying custom validation to each element.

## Properties

- **minLength**: `number` - Specifies the minimum length the array must have.
- **maxLength**: `number` - Defines the maximum length allowed for the array.
- **unique**: `boolean` - Ensures all elements in the array are unique.
- **validator**: `ValidatorFunction<T>` - A custom validation function to apply to each element in the array.

## Usage

To use the `Array`, apply it to array properties in your class, specifying the desired validation constraints.

### Example

```typescript
import { ClassValidator, Array } from "rest-data-validator";

@ClassValidator
class ShoppingCart {
  @Array({
    minLength: 1,
    unique: true,
    validator: (item) => {
      // Custom validation logic for each item
      return item.price > 0
        ? { isValid: true }
        : { isValid: false, errors: ["Price must be greater than 0"] };
    },
  })
  items: Array<{ id: number; price: number }>;
}
```

In this example, the `items` array must have at least one item, each item must be unique, and every item must satisfy the custom validation condition (price greater than 0).

### Applying Array

To apply the `Array`, you need to decorate your class property with `@Array` and provide the necessary validation options. This enables a declarative approach to specifying validation logic directly within your class models.

The `Array` is a powerful tool for ensuring data integrity for array properties, supporting both simple constraints and complex, element-wise validation.

# Sanitizer Functions

Sanitizer functions are utility functions that allow you to clean or standardize data before it's processed. These are particularly useful when handling user input or preparing data for storage or further computation.

## Available Sanitizer Functions

- `trim(value: string): string`: Trims whitespace from both ends of a string.
- `toLowerCase(value: string): string`: Converts a string to lowercase.
- `toUpperCase(value: string): string`: Converts a string to uppercase.
- `round(value: number): number`: Rounds a number to the nearest integer.
- `toNumber(value: string): number`: Converts a string to a number.
- `floor(value: number): number`: Floors a number to the nearest lower integer.
- `ceil(value: number): number`: Ceils a number to the nearest higher integer.
- `toBoolean(value: string): boolean`: Converts a string to a boolean. It is case insensitive and recognizes 'true' and 'false'.
- `stripHtml(value: string): string`: Removes all HTML tags from a string.
- `urlEncode(value: string): string`: Encodes a string to be used in a URL.
- `urlDecode(value: string): string`: Decodes a URL-encoded string.
- `toDate(value: string): Date | null`: Converts a string to a Date object. Returns null if the string cannot be converted.
- `toInteger(value: string): number`: Converts a string to an integer. Returns NaN if the string cannot be converted.
- `toFloat(value: string): number`: Converts a string to a float. Returns NaN if the string cannot be converted.
- `toJson(value: string): any`: Converts a string to JSON. Returns null if the string cannot be converted.

## Usage

You can use these functions directly on any input data to sanitize it according to your needs. For example:

```typescript
import { trim, toLowerCase, toNumber } from "path-to-sanitizers";

const userInput = "   Some User Input   ";
const cleanInput = trim(userInput); // 'Some User Input'
const lowerCaseInput = toLowerCase(cleanInput); // 'some user input'
const numericValue = toNumber("123.45"); // 123.45
```

# Async Validators

Async validators are functions that provide a way to perform validation asynchronously. This is useful when validation logic requires IO operations like database lookups, API calls, or any other asynchronous computation.

## AsyncValidator Type

An `AsyncValidator` is a function that takes a value of type `T` and an optional options object. It returns a `Promise` that resolves to a `ValidationResult` object.

## Usage

To use an `AsyncValidator`, you would typically call it with a value and optionally pass in any options that the validator requires.

```typescript
import { AsyncValidator } from "path-to-validators";

const validateEmail: AsyncValidator<string> = async (email, options) => {
  // Perform email validation logic here
  // Return a promise that resolves to a ValidationResult
};

const email = "user@example.com";
validateEmail(email).then((validationResult) => {
  if (validationResult.isValid) {
    // Email is valid
  } else {
    // Email is invalid
    console.log(validationResult.errors);
  }
});
```

## Nested Validators

The nested validator is a powerful tool for validating nested and complex data structures. It uses a combination of individual validators to validate different parts of the data structure.

### Creating Validators

First, we create individual validators for each type of object we want to validate. For example, if we want to validate objects of the User, Product, and Order classes, we create a validator for each one:

```typescript
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
```

### Creating the Complex Validator

Next, we combine these validators into a complex validator:

```typescript
const complexClassValidator: IValidator<any> = combinedValidatorFactory([
  { validator: isUserValidator, typeGuard: (value: any): value is User => value instanceof User },
  { validator: isProductValidator, typeGuard: (value: any): value is Product => value instanceof Product },
  { validator: isOrderValidator, typeGuard: (value: any): value is Order => value instanceof Order },
]);
```

### Using the Complex Validator

Finally, we use the complex validator to validate our data structures:

```typescript
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
```

In this example, `validationResult.isValid` will be true if all objects pass their corresponding validations, and false otherwise. Specific error messages can be found in `validationResult.errors`.

### Nested Decorator

The `@Nested` decorator is used to apply nested validation rules to properties of a class. This decorator allows you to specify complex validation logic that can validate deeply nested objects or arrays of objects within your class instances.

#### Example Usage

To use the `@Nested` decorator, you define your complex validator and then apply it to a class property using the decorator. Here's how you might use it in a class:

```typescript
@ClassValidator
class ComplexClass {
    @Nested({
        validator: complexClassValidator,
        validationOptions: {},
        each: true,
    })
    public order: Order;

    constructor(order: Order) {
        this.order = order;
    }
}
```

This example demonstrates how to apply the `@Nested` decorator to the `order` property of the `ComplexClass`. The decorator is configured with a complex validator that specifies how to validate the `Order` object and its nested properties.

### Conclusion

The use of `@Nested` along with other validation decorators provides a powerful and flexible way to enforce validation rules across complex data structures. By combining simple and complex validators, you can create comprehensive validation strategies that ensure the integrity of your data.

# Contextual Validator Documentation

## Overview

The Contextual Validator is a flexible and powerful tool in the TypeScript validation library that enables dynamic validation based on the context of the data. This validator is particularly useful for scenarios where the validation logic depends on certain conditions or the environment in which the data exists.

## How It Works

The Contextual Validator uses a context object that is passed along with the value to be validated. The context provides additional information that influences the validation process, such as user roles, dates, location, and more.

### Key Features

- **Dynamic Context**: Change the validation rules on-the-fly by altering the context.
- **Multiple Contexts**: Manage and apply different contexts for different validation scenarios.
- **Combinable**: Use alongside other validators like `String` or `Number` to create complex validation logic.

### Test Cases

- Validate that water usage is within limits for crops that require less water.
- Deny a harvest date that falls before the actual planting date.
- Restrict the use of pesticides not on the allowed list.
- Ensure the batch quantity is within the specified range.
- Check for valid batch ID length.

## Contextual Validators

### Direct Use of the validateContextual Function

For scenarios where you need to validate data outside the context of a class, you can directly use the `validateContextual` function. This approach provides flexibility for validating data structures or values dynamically based on a provided context.

### Basic Usage

```typescript
import { validateContextual } from "rest-data-validator";
import { IContextualValidationOptions } from 'rest-data-validator/interfaces/IContextualValidationOptions';

const validationOptions: IContextualValidationOptions = {
  name: "UserRoleCheck",
  getContext: () => ({ userRole: "admin" }),
  validate: (value, context) => value === "secret" && context.userRole === "admin",
};

const result = validateContextual("secret", validationOptions);
if (!result.isValid) {
  console.error("Validation failed:", result.errors);
}
```

### Context Management

Dynamically manage the validation context using `setContext`, `getContext`, and other context management utilities provided by your validation library.

### Advanced Validation Scenarios

Discuss potential advanced use cases such as multi-step validations, conditional validations based on user roles, environmental conditions, etc.

For detailed guides, examples, and more advanced usage scenarios, please refer to the specific documentation within your validation library. This documentation should be adapted to include your library's specific import paths and utility functions.

## Contextual Decorator

### Using the Contextual Decorator in Class Validation

The `Contextual` decorator allows for dynamic validation of class properties based on a contextual understanding of the application state or environment. This document explains how to use the `Contextual` decorator to validate class properties effectively.

### Defining a Class with Contextual Validation

```typescript
import "reflect-metadata";
import { ClassValidator, String, Contextual, setContext, getContext } from "rest-data-validator";

@ClassValidator
class CropBatch {
  @String({ minLength: 5, maxLength: 10 })
  batchId: string;

  @Contextual({
    name: "HarvestDateValidator",
    getContext: () => getContext("cropBatchContext"),
    validate: (value, context) => new Date(value) <= new Date(context.currentDate) && new Date(value) >= new Date(context.plantingDate),
    message: "Harvest date must be between planting date and current date.",
  })
  harvestDate: string;

  // Additional properties with Contextual decorators
}
```

### Setting Up the Context

Before instantiating your class, set up the necessary context:

```typescript
setContext("cropBatchContext", {
  currentDate: "2023-08-01",
  plantingDate: "2023-03-01",
  // Other context-specific configurations
});
```

### Instantiation and Validation

Create an instance of your class as usual. The `ClassValidator` decorator will automatically validate the instance based on the defined context:

```typescript
const cropBatch = new CropBatch("Batch1", "2023-07-01");
```

If validation fails, an error will be thrown detailing the validation issues.

### Potential Use Cases

#### Agriculture Traceability

Track and validate different stages of crop production, ensuring that each batch meets the required standards for planting and harvesting times, pesticide use, water usage, and quantity.

#### Blockchain Transactions

Verify blockchain transactions, such as Ethereum, by validating the context such as the correct wallet addresses, transaction times within a certain block confirmation window, and the amount transferred against wallet balance.

#### Healthcare Management

In healthcare applications, validate patient records contextually based on admission dates, treatment types, and medication dosages according to individual health plans and protocols.

### Conclusion

The Contextual Validator, with its dynamic and versatile nature, is ideal for any application that requires contextual awareness in its validation logic, ensuring data integrity and adherence to business rules and standards.

# Dependency Validators

## Overview

This documentation aims to provide a clear and professional guide on using the `DependencyValidator` decorator and the `ValidateDependency` function within the validation framework. Both tools are designed to offer powerful and flexible validation mechanisms, each serving specific roles in ensuring data integrity and business logic conformity.

## 1. Dependency Decorator

### 1.1 Introduction

`DependencyValidator` is a decorator used to specify validation rules for class properties based on the dependencies between them. It allows for dynamic validation where the validity of one property may depend on the value of another.

### 1.2 Usage

To use `DependencyValidator`, annotate the target property with `@DependencyValidator`, providing a validation configuration object. This object must define the `name`, `getDependencies`, `validate`, and `message` properties.

### 1.3 Example

Suppose we have a `Product` class where the `saleDate` must not precede the `manufactureDate`:

```typescript
import { DependencyValidator, ClassValidator } from "../../src";

@ClassValidator
class Product {
    public manufactureDate: Date;
    
    @DependencyValidator({
        name: "SaleDateAfterManufactureDate",
        getDependencies: (instance) => ({ manufactureDate: instance.manufactureDate }),
        validate: (saleDate, { manufactureDate }) => saleDate >= manufactureDate,
        message: "Sale date must be after the manufacture date.",
    })
    public saleDate: Date;
}
```

## 2. Dependency Function

### 2.1 Introduction

`ValidateDependency` is a function that directly validates an object's property against specified dependencies and rules. It's particularly useful in scenarios where validations need to be triggered programmatically.

### 2.2 Usage

Invoke `ValidateDependency` with the target object, the value to validate, and the validation options object. The function returns a `ValidationResult` indicating whether the validation passed and containing any error messages if it didn't.

### 2.3 Example

Validating a `Product` instance's `saleDate` could look something like this:

```typescript
const product = new Product(/* initialize properties */);
const validationResult = ValidateDependency(
    product,
    product.saleDate,
    {
        name: "SaleDateAfterManufactureDate",
        getDependencies: () => ({ manufactureDate: product.manufactureDate }),
        validate: (saleDate, { manufactureDate }) => saleDate >= manufactureDate,
        message: "Sale date must be after the manufacture date.",
    }
);

if (!validationResult.isValid) {
    console.error(validationResult.errors);
}
```

## 3. Separating Validation Logic in a Clean Architecture Approach

### Overview

This guide focuses on organizing validation logic separately from your model definitions to achieve a cleaner architecture and more maintainable codebase. It explains how to structure your project files and set up validations using a dedicated configuration.

### Table of Contents

- [Folder and File Structure](#folder-and-file-structure)
- [Setting Up the Model](#setting-up-the-model)
- [Configuring Validations](#configuring-validations)
- [Applying Configuration](#applying-configuration)
- [Example Usage](#example-usage)

### Folder and File Structure

Organize your project to keep the model definitions clean by following this structure:

```
src/
│
├── models/
│   └── AgricultureProduct.ts
│
├── validations/
│   └── AgricultureProductValidations.ts
│
└── decorators/
    ├── DependencyValidator.ts
    └── ValidateDependency.ts
```

- `models/`: Contains the application's data models.
- `validations/`: Stores separate files for configuring validations for each model.
- `decorators/`: Includes the implementations of validation decorators.

### Setting Up the Model

Define your models in a clear and concise manner, focusing solely on data representation.

**AgricultureProduct.ts**:

```typescript
export class AgricultureProduct {
  public harvestDate: Date;
  public saleDate: Date;
  // Additional properties as needed.

  constructor(
    harvestDate: Date,
    saleDate: Date,
    // Other constructor parameters.
  ) {
    this.harvestDate = harvestDate;
    this.saleDate = saleDate;
    // Initialize other properties.
  }
}
```

### Configuring Validations

Create dedicated files for validation configurations to decouple validation logic from the model.

**AgricultureProductValidations.ts**:

```typescript
import { Dependency } from "../decorators/DependencyValidator";
import { AgricultureProduct } from "../models/AgricultureProduct";

export const configureAgricultureProductValidations = () => {
    Dependency({
        name: "SaleDateAfterHarvestDate",
        getDependencies: (instance) => ({ harvestDate: instance.harvestDate }),
        validate: (saleDate, { harvestDate }) => saleDate >= harvestDate,
        message: "The sale date cannot be before the harvest date.",
    })(AgricultureProduct.prototype, "saleDate");

    // Repeat for other properties needing validation.
};
```

### Applying Configuration

Ensure the validation configurations are applied by invoking the setup function at the application's entry point.

**main.ts**:

```typescript
import "reflect-metadata";
import { configureAgricultureProductValidations } from "./validations/AgricultureProductValidations";

configureAgricultureProductValidations();
```

### Example Usage

With this setup, your `AgricultureProduct` instances will be validated according to the defined rules, keeping the model's definition clean and focused on its primary purpose.

This approach enhances code maintainability, facilitates easier testing, and adheres to Clean Architecture principles by separating concerns effectively.

## Conclusion

`DependencyValidator` and `ValidateDependency` provide a robust framework for implementing complex validation logic that respects the interdependencies between data fields. By following the outlined guidelines and examples, developers can ensure their applications maintain data integrity and adhere to business rules effectively.

# Accessors Decorator

The `Accessors` decorator is a convenient way to automatically create getters and setters for class properties. This simplifies the encapsulation of properties and promotes best practices with minimal boilerplate code.

## Usage

```typescript
import { Accessors } from "rest-data-validator";

@Accessors({ includePrivate: true })
class Example {
    private _property: string;

    constructor(property: string) {
        this._property = property;
    }
}
```

### Options

- `includePrivate`: Include private properties in accessor generation (default is `false`).
- `enumerable`: Mark properties as enumerable (default is `false`).
- `writable`: Mark properties as writable (default is `true`).

# Getter Decorator

The `Getter` decorator simplifies the creation of a getter for a specific property, making it read-only by default but visible during property enumeration if specified.

## Usage

```typescript
import { Getter } from "rest-data-validator";

class Example {
    @Getter({ enumerable: true })
    private _property: string = 'default';
}
```

### Options

- `enumerable`: Make the getter enumerable (default is `true`).

# Setter Decorator

The `Setter` decorator allows for the automatic creation of a setter for a specific property, giving you the ability to control the writability of a property dynamically.

## Usage

```typescript
import { Setter } from "rest-data-validator";

class Example {
    @Setter({ writable: true })
    private _property: string = 'default';
}
```

### Options

- `writable`: Make the setter writable (default is `true`).

These decorators and interfaces form part of the `rest-data-validator`'s effort to streamline the property management within classes, focusing on clean, maintainable, and efficient code.

## Roadmap

The `rest-data-validator` project aims to continually evolve with the needs of developers and the dynamics of RESTful API design. Below is a tentative roadmap of features and improvements we're exploring:

### Upcoming Features

- [x] **Nested Validation Support**: Implement validation for complex, nested data structures to accommodate intricate API schemas.

- [x] **Asynchronous Validators**: Introduce validators capable of handling asynchronous operations, useful for database lookups or external API validations.

- [ ] **Internationalization**: Offer localized error messages to better serve a global user base.

- [ ] **Sanitization Enhancements**: Expand sanitization utilities for preprocessing data, ensuring robust input handling before validation.

- [ ] **Framework Middleware**: Develop middleware for seamless integration with popular server frameworks like Express and NestJS.

- [ ] **Runtime Type System Integration**: Explore compatibility with runtime type validation libraries to enhance JavaScript validation capabilities.

- [ ] **CLI Tooling**: Build CLI tools for generating validator schemas from TypeScript type definitions, aiding in rapid development cycles.

- [ ] **Plugin Architecture**: Create an extensible plugin system allowing custom validators and sanitizers, fostering community-driven enhancements.

- [ ] **Performance Optimization**: Profile and optimize the core validation logic to efficiently handle large datasets and reduce overhead in high-throughput environments.

- [ ] **GUI for Schema Building**: Provide a graphical interface for constructing and exporting validation schemas, streamlining the setup process for `rest-data-validator`.

We welcome community input and contributions to help shape the future of `rest-data-validator`. If you have ideas or features you’d like to see, please open an issue to start the conversation.

Note: The roadmap is subject to change and reflects current planning and priorities.

## Contributing

Contributions are welcome! Please read our contributing guide for details on our code of conduct, and the process for submitting pull requests to us.

## Support Us

If you find the REST Data Validator helpful or interesting, please consider giving it a star on GitHub! 🌟 Your support encourages us to continue developing and maintaining this project.

### Why Star Us?

- **Recognition:** A star is a token of appreciation that motivates open-source contributors.
- **Feedback:** It tells us that our work is valued, guiding us on what features or improvements to prioritize.
- **Visibility:** More stars increase our project's visibility, helping others discover this tool.

### How to Star Our Repository

1. Visit the [REST Data Validator GitHub page](https://github.com/SeanLuis/rest-data-validator).
2. In the top-right corner of the page, click the "Star" button.
3. That's it! You've just made our day a little brighter.

Your star is much more than just a number to us – it's a sign that we're on the right track. Thank you for your support, and we hope REST Data Validator helps you in managing and validating your RESTful APIs more effectively.

Feel free to explore the repository, check out the latest updates, and contribute if you can. Together, we can make REST Data Validator even better!

## Author

- **Sean Luis Guada Rodriguez** - [Visit Website](https://sean-rodriguez.vercel.app)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/SeanLuis/rest-data-validator/blob/master/LICENSE) file for details.
