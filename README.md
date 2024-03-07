# REST Data Validator

![Code Coverage](https://img.shields.io/badge/Code%20Coverage-97%25-success?style=flat)
[![Package Build](https://github.com/SeanLuis/rest-data-validator/actions/workflows/build.yml/badge.svg)](https://github.com/SeanLuis/rest-data-validator/actions/workflows/build.yml)
[![npm version](https://badge.fury.io/js/rest-data-validator.svg)](https://badge.fury.io/js/rest-data-validator)

REST Data Validator is a versatile library designed to offer comprehensive validation for data in RESTful APIs. It supports a wide range of data types, validation rules, and is designed with extensibility in mind, making it ideal for ensuring data integrity and compliance with API specifications.

## Features

- **Comprehensive Validation**: Supports validation of strings, numbers, dates, enums, files, and custom formats.
- **Decorator-based Validation**: Utilizes TypeScript decorators for easy and declarative validation directly in your class models.
- **Flexible and Extensible**: Easily extendable to include custom validation rules and logic.
- **Framework Agnostic**: Can be used with any server-side framework or library, such as Express, Koa, or Fastify.
- **Full TypeScript Support**: Leverages TypeScript for type safety and enhanced developer experience.
- **Custom Error Messages**: Allows defining custom error messages for each validation rule to provide clear and specific feedback.

# REST Data Validator

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Example](#basic-example)
  - [Using Decorators for Validation](#using-decorators-for-validation)
  - [Custom Validation Rules](#custom-validation-rules)
- [ClassValidator Decorator](#classvalidator-decorator)
- [String Decorator](#string-decorator)
- [Number Decorator](#number-decorator)
- [Date Decorator](#date-decorator)
- [Enum Decorator](#enum-decorator)
- [File Decorator](#file-decorator)
- [Range Decorator](#range-decorator)
- [Regex Decorator](#regex-decorator)
- [Custom Decorator](#custom-decorator)
- [Domain Decorator](#domain-decorator)
- [Array Decorator](#array-decorator)
- [Sanitizer Functions](#sanitizer-functions)
- [Async Validators](#async-validators)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

<!-- Rest of the content -->

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

# ClassValidator Decorator

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

### Validation of Divisible Numbers

```typescript
@ClassValidator
class Measurement {
  @Number({ divisibleBy: 0.5 })
  length: number;
}
```

Here, `length` must be a number divisible by 0.5, allowing values like 1.5, 2.0, 2.5, etc.

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

## Contributing

Contributions are welcome! Please read our contributing guide for details on our code of conduct, and the process for submitting pull requests to us.

## Author

- **Sean Luis Guada Rodriguez** - [Visit Website](https://sean-rodriguez.vercel.app)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/SeanLuis/rest-data-validator/blob/master/LICENSE) file for details.
