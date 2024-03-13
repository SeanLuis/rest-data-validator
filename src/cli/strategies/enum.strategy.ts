import { PropertyDeclaration } from 'ts-morph';
import inquirer from 'inquirer';
import { ValidationStrategy } from './validation.strategy';

export class EnumStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) => property.getName());

    const answers = await inquirer.prompt([
      {
        name: 'property',
        message: 'Select the property to add enum validation:',
        type: 'list',
        choices: propertyNames,
      },
      {
        name: 'enum',
        message: 'Enter the enum values (comma separated):',
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
        name: 'Enum',
        arguments: [
          `{
            enum: [${answers.enum.split(',').map((value: any) => `"${value.trim()}"`)}],
            message: "${answers.message}",
          }`
        ]
      });
    }
  }
}