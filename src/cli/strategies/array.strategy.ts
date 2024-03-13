import { PropertyDeclaration } from 'ts-morph';
import inquirer from 'inquirer';
import { ValidationStrategy } from './validation.strategy';

export class ArrayStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) => property.getName());

    const answers = await inquirer.prompt([
      {
        name: 'property',
        message: 'Select the array property to add validation:',
        type: 'list',
        choices: propertyNames,
      },
      {
        name: 'minLength',
        message: 'Enter the minimum length:',
        type: 'input',
        validate: input => !isNaN(parseInt(input, 10)),
      },
      {
        name: 'maxLength',
        message: 'Enter the maximum length:',
        type: 'input',
        validate: input => !isNaN(parseInt(input, 10)),
      },
      {
        name: 'unique',
        message: 'Should all elements be unique?',
        type: 'confirm',
      },
      {
        name: 'message',
        message: 'Validation error message:',
        type: 'input',
      }
    ]);

    const validatorFunction = `
      (item: number) => ({
        isValid: item > 0,
        errors: item <= 0 ? ['Item must be greater than 0'] : []
      })
    `;

    const property = this.classes[0].getProperty(answers.property);
    if (property) {
      property.addDecorator({
        name: 'Array',
        arguments: [
          `{
            minLength: ${answers.minLength},
            maxLength: ${answers.maxLength},
            unique: ${answers.unique},
            validator: ${validatorFunction},
            message: "${answers.message}"
          }`,
        ],
      });
    }
  }
}
