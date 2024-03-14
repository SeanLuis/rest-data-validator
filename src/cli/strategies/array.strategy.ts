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

    const validatorFunction = `(item: number) => ({
      isValid: item >= ${answers.minLength} ? ['Item must be equal to or greater than ${answers.minLength}'] : [],
      errors: item <= ${answers.maxLength} ? ['Item must be equal to or less than ${answers.maxLength}'] : []
    })`;

    const property = this.classes[0].getProperties().find(p => p.getName() === answers.property);

    if (property) {
      property.addDecorator({
        name: 'Array',
        arguments: [
          `{
            minLength: ${answers.minLength},
            maxLength: ${answers.maxLength},
            unique: ${answers.unique},
            validator:${validatorFunction},
            message: "${answers.message}"
          }`,
        ],
      });
    }
  }
}
