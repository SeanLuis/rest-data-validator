import { PropertyDeclaration } from "ts-morph";
import inquirer from "inquirer";
import { ValidationStrategy } from "./ValidationStrategy";
import { securityStrategies } from "../../utils/validations/SecurityStrategies";

export class SecurityStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) => property.getName());
    const strategyNames = Object.keys(securityStrategies);

    const answers = await inquirer.prompt([
      {
        name: 'property',
        message: 'Select the property to add security validation:',
        type: 'list',
        choices: propertyNames,
      },
      {
        name: 'strategy',
        message: 'Select the security strategy to apply:',
        type: 'list',
        choices: strategyNames,
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
        name: 'Security',
        arguments: [
          `{
            type: "${answers.strategy}",
            message: "${answers.message}",
          }`
        ]
      });
    }
  }
}