import { PropertyDeclaration } from 'ts-morph';
import inquirer from 'inquirer';
import { ValidationStrategy } from './validation.strategy';

export class RequiredStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) => property.getName());

    const answers = await inquirer.prompt([
      {
        name: 'property',
        message: 'Select the property to add "Required" validation:',
        type: 'list',
        choices: propertyNames,
      }
    ]);

    const property = this.classes[0].getProperty(answers.property);
    if (property) {
      property.addDecorator({
        name: 'Required'
      });
    }
  }
}
