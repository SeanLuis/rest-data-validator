
# REST Data Validator

REST Data Validator is a versatile library designed to offer comprehensive validation for data in RESTful APIs. It supports a wide range of data types and validation rules, making it an ideal choice for ensuring data integrity and compliance with API specifications.

## Features

- **Comprehensive Validation**: Supports validation of various data types including strings, numbers, dates, and custom formats.
- **Flexible**: Easily extendable to include custom validation rules and logic.
- **Framework Agnostic**: Designed to be used with any server-side framework or library, such as Express, Koa, or Fastify.
- **TypeScript Support**: Full TypeScript support to ensure type safety and to enhance developer experience.
- **Custom Error Messages**: Allows defining custom error messages for each validation rule to provide clear feedback.

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

```typescript
import { validateString, validateNumber } from 'rest-data-validator';

const stringValidationResult = validateString('Test', { minLength: 2, maxLength: 5 });
console.log(stringValidationResult);

const numberValidationResult = validateNumber(10, { min: 1, max: 100 });
console.log(numberValidationResult);
```

### Advanced Usage

Define custom validation rules for complex scenarios:

```typescript
import { ValidationResult, RegexValidationOptions } from 'rest-data-validator';

const customValidationResult: ValidationResult = validateCustom({
  value: 'example',
  options: {
    pattern: /example/,
    message: 'Value must match "example"',
  } as RegexValidationOptions
});
console.log(customValidationResult);
```

## Contributing

Contributions are welcome! Please read our [contributing guide](#) for details on our code of conduct, and the process for submitting pull requests to us.

## Author

- **Sean Luis Guada Rodriguez** - [Visit Website](https://sean-rodriguez.vercel.app)

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.
