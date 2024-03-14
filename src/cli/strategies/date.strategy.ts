import { PropertyDeclaration } from 'ts-morph';
import inquirer from 'inquirer';
import { ValidationStrategy } from './validation.strategy';

export class DateStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) => property.getName());

    const answers = await inquirer.prompt([
      {
        name: 'property',
        message: 'Select the property to add date validation:',
        type: 'list',
        choices: propertyNames,
      },
      {
        name: 'format',
        message: 'Enter the date format (e.g., "YYYY-MM-DD"):',
        type: 'input',
      },
      {
        name: 'before',
        message: 'Enter the before date (optional):',
        type: 'input',
      },
      {
        name: 'after',
        message: 'Enter the after date (optional):',
        type: 'input',
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
        name: 'Date',
        arguments: [
          `{
            format: "${answers.format}",
            before: "${answers.before}",
            after: "${answers.after}",
            message: "${answers.message}",
          }`
        ]
      });
    }
  }
}