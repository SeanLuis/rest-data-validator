import { PropertyDeclaration } from 'ts-morph';
import inquirer from 'inquirer';
import { ValidationStrategy } from './validation.strategy';

export class DependencyStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) => property.getName());

    const answers = await inquirer.prompt([
      {
        name: 'validationName',
        message: 'Enter the validation name:',
        type: 'input'
      },
      {
        name: 'property',
        message: 'Select the property you want to add validation to:',
        type: 'list',
        choices: propertyNames,
      },
      {
        name: 'dependency',
        message: 'Validation dependency:',
        type: 'list',
        choices: propertyNames,
      },
      {
        name: 'message',
        message: 'Validation error message:',
        type: 'input',
      },
    ]);

    const property = this.classes[0].getProperties().find(p => p.getName() === answers.property);

    if (property) {
      property.addDecorator({
        name: 'Dependency',
        arguments: [
          `{
            name: "${answers.validationName}",
            getDependencies: (instance: ${this.classes[0].getName()}) => ({ ${answers.dependency}: instance.${answers.dependency} }),
            validate: (${answers.property}, { ${answers.dependency} }) => { /* Validations here */ },
            message: "${answers.message}",
          }`
        ],
      });
    }
  }
}