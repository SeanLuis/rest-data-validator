# REST Data Validator

![Jest Coverage](https://img.shields.io/badge/Jest%20Coverage-98.50%25-success?style=flat)
[![Codecov](https://codecov.io/gh/SeanLuis/rest-data-validator/graph/badge.svg?token=rhWlGJspdW)](https://codecov.io/gh/SeanLuis/rest-data-validator)
[![Package Build](https://github.com/SeanLuis/rest-data-validator/actions/workflows/build.yml/badge.svg)](https://github.com/SeanLuis/rest-data-validator/actions/workflows/build.yml)
[![Version](https://badge.fury.io/js/rest-data-validator.svg)](https://badge.fury.io/js/rest-data-validator)

REST Data Validator is a versatile library designed to offer comprehensive validation for data in RESTful APIs. It supports a wide range of data types, validation rules, and is designed with extensibility in mind, making it ideal for ensuring data integrity and compliance with API specifications.

### For detailed **documentation**, visit: [REST Data Validator Documentation](https://rest-data-validator.netlify.app/)

![Package home preview](preview.png)

## Features

- **Comprehensive Validation**: Supports validation of strings, numbers, emails, dates, enums, files, and custom formats.
- **Decorator-based Validation**: Utilizes TypeScript decorators for easy and declarative validation directly in your class models.
- **Flexible and Extensible**: Easily extendable to include custom validation rules and logic.
- **Framework Agnostic**: Can be used with any server-side framework or library, such as Express, Koa, or Fastify.
- **Full TypeScript Support**: Leverages TypeScript for type safety and enhanced developer experience.
- **Custom Error Messages**: Allows defining custom error messages for each validation rule to provide clear and specific feedback.

# REST Data Validator

- Features
- Installation
- Usage
  - Basic Example
  - Using Decorators for Validation
  - Custom Validation Rules
- Rest CLI
  - Commands
  - Model Generation
  - Validation Generation
- Validators and Decorators
  - ClassValidator
  - Number
  - Email
  - Password
  - Date
  - Enum
  - File
  - Range
  - Regex
  - Custom
  - Domain
  - Array
  - Nested
  - Contextual
  - Dependency
  - Security
  - Alpha
  - Contains
- Group-Based Validation
- Sanitizer Functions
- Validation Utilities
  - Async Validators
  - Nested Validators
  - Contextual Validators
  - Dependency Validators
    - Dependency Decorator
      - Introduction
      - Usage
      - Example
    - Dependency Function
      - Introduction
      - Usage
      - Example
    - Separating Validation Logic in a Clean Architecture Approach
- Decorators Utilities
  - Accessors Decorator
  - Getter Decorator
  - Setter Decorator
- Security Utilities
  - Security Validation
  - Security Decorator
  - Security Events
- Roadmap
- Contributing
- Support Us
- Author
- License

## Installation

```bash
npm install rest-data-validator
```

Or using Yarn:

```bash
yarn add rest-data-validator
```

## Roadmap

The `rest-data-validator` project aims to continually evolve with the needs of developers and the dynamics of RESTful API design. Below is a tentative roadmap of features and improvements we're exploring:

### Upcoming Features

- [X] **Nested Validation Support**: Implement validation for complex, nested data structures to accommodate intricate API schemas.

- [X] **Asynchronous Validators**: Introduce validators capable of handling asynchronous operations, useful for database lookups or external API validations.

- [ ] **Internationalization**: Offer localized error messages to better serve a global user base.

- [ ] **Sanitization Enhancements**: Expand sanitization utilities for preprocessing data, ensuring robust input handling before validation.

- [X] **Framework Middleware**: Develop middleware for seamless integration with popular server frameworks like Express and NestJS.

- [ ] **Runtime Type System Integration**: Explore compatibility with runtime type validation libraries to enhance JavaScript validation capabilities.

- [X] **CLI Tooling**: Build CLI tools for generating validator schemas from TypeScript type definitions, aiding in rapid development cycles.

- [ ] **Plugin Architecture**: Create an extensible plugin system allowing custom validators and sanitizers, fostering community-driven enhancements.

- [X] **Performance Optimization**: Profile and optimize the core validation logic to efficiently handle large datasets and reduce overhead in high-throughput environments.

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
