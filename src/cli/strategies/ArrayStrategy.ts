import { PropertyDeclaration } from "ts-morph";
import inquirer from "inquirer";
import { ValidationStrategy } from "./ValidationStrategy";

export class ArrayStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) =>
      property.getName()
    );

    const answers = await inquirer.prompt([
      {
        name: "property",
        message: "Select the array property to add validation:",
        type: "list",
        choices: propertyNames,
      },
      {
        name: "minLength",
        message: "Enter the minimum length:",
        type: "input",
        validate: (input) => !isNaN(parseInt(input, 10)),
      },
      {
        name: "maxLength",
        message: "Enter the maximum length:",
        type: "input",
        validate: (input) => !isNaN(parseInt(input, 10)),
      },
      {
        name: "unique",
        message: "Should all elements be unique?",
        type: "confirm",
      },
      {
        name: "message",
        message: "Validation error message:",
        type: "input",
      },
    ]);

    const validatorFunction = answers.minLength || answers.maxLength ? `(item: number) => ({
      isValid: ${answers.minLength ? `item >= ${answers.minLength}` : 'true'} ? ['Item must be equal to or greater than ${answers.minLength}'] : [],
      errors: ${answers.maxLength ? `item <= ${answers.maxLength}` : 'true'} ? ['Item must be equal to or less than ${answers.maxLength}'] : []
    })` : 'undefined';

    const property = this.classes[0]
      .getProperties()
      .find((p) => p.getName() === answers.property);

    if (property) {
      property.addDecorator({
        name: "Array",
        arguments: [
          `{
            ${answers.minLength ? `minLength: ${answers.minLength},` : ""}
            ${answers.maxLength ? `maxLength: ${answers.maxLength},` : ""}
            unique: ${answers.unique},
            validator: ${validatorFunction},
            message: "${answers.message}"
          }`,
        ],
      });
    }
  }
}
