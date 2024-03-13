import { PropertyDeclaration } from 'ts-morph';
import inquirer from 'inquirer';
import { ValidationStrategy } from './validation.strategy';

export class RangeStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) => property.getName());

    const answers = await inquirer.prompt([
      {
        name: 'property',
        message: 'Select the property to add range validation:',
        type: 'list',
        choices: propertyNames,
      },
      {
        name: 'min',
        message: 'Enter the minimum allowed value (leave empty for no minimum):',
        type: 'input',
      },
      {
        name: 'max',
        message: 'Enter the maximum allowed value (leave empty for no maximum):',
        type: 'input',
      },
      {
        name: 'inclusive',
        message: 'Should the range be inclusive (true/false)?',
        type: 'confirm',
      },
      {
        name: 'step',
        message: 'Enter the allowed step between values (leave empty for any step):',
        type: 'input',
      },
      {
        name: 'dateFormat',
        message: 'Enter the expected date format (leave empty for any format):',
        type: 'input',
      },
      {
        name: 'message',
        message: 'Validation error message:',
        type: 'input',
      }
    ]);

    const property = this.classes[0].getProperty(answers.property);
    if (property) {
      property.addDecorator({
        name: 'Range',
        arguments: [
          `{
            ${answers.min ? `min: ${answers.min},` : ''}
            ${answers.max ? `max: ${answers.max},` : ''}
            inclusive: ${answers.inclusive},
            ${answers.step ? `step: ${answers.step},` : ''}
            ${answers.dateFormat ? `dateFormat: "${answers.dateFormat}",` : ''}
            message: "${answers.message}",
          }`
        ]
      });
    }
  }
}