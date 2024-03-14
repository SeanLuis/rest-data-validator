import { PropertyDeclaration } from 'ts-morph';
import inquirer from 'inquirer';
import { ValidationStrategy } from './validation.strategy';

export class NestedStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) => property.getName());

    const answers = await inquirer.prompt([
      {
        name: 'property',
        message: 'Select the property to add nested validation:',
        type: 'list',
        choices: propertyNames,
      },
      {
        name: 'validator',
        message: 'Enter the validator class or function name:',
        type: 'input',
      },
      {
        name: 'each',
        message: 'Apply the validation to each element in an array of objects (true/false)?',
        type: 'confirm',
      },
      {
        name: 'message',
        message: 'Validation error message:',
        type: 'input',
      }
    ]);

    const property = this.classes[0].getProperties().find(p => p.getName() === answers.property);
    if (property) {
      property.addDecorator({
        name: 'Nested',
        arguments: [
          `{
            validator: ${answers.validator},
            validationOptions: {
              // validationOptions is an optional object that can be used to provide additional
              // configuration for the validator. The properties of this object depend on the
              // specific validator being used. For example, for a UserValidator, you might have:
              //
              // validationOptions: {
              //   prefix: 'valid', // The prefix that all valid usernames should have
              //   minAge: 18, // The minimum age for a valid user
              // }
              //
              // For a ProductValidator, you might have:
              //
              // validationOptions: {
              //   prefix: 'valid', // The prefix that all valid product names should have
              //   minPrice: 10, // The minimum price for a valid product
              // }
              //
              // If the "each" property is set to true, the validation will be applied to each
              // element in an array of objects.
            },
            each: ${answers.each},
            message: "${answers.message}",
          }`
        ]
      });
    }
  }
}