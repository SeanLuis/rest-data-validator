import { PropertyDeclaration } from "ts-morph";
import inquirer from "inquirer";
import { ValidationStrategy } from "./ValidationStrategy";

export class EmailStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) =>
      property.getName()
    );

    const answers = await inquirer.prompt([
      {
        name: "property",
        message: "Select the property to add email validation:",
        type: "list",
        choices: propertyNames,
      },
      {
        name: "regexPattern",
        message: "Enter the regex pattern for email validation:",
        type: "input",
      },
      {
        name: "message",
        message: "Validation error message:",
        type: "input",
      },
    ]);

    const property = this.classes[0]
      .getProperties()
      .find((p) => p.getName() === answers.property);

    if (property) {
      property.addDecorator({
        name: "Email",
        arguments: [
          `{
            regexPattern: new RegExp("${answers.regexPattern}"),
            message: "${answers.message}",
          }`,
        ],
      });
    }
  }
}
