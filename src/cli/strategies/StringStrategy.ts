import { PropertyDeclaration } from "ts-morph";
import inquirer from "inquirer";
import { ValidationStrategy } from "./ValidationStrategy";

export class StringStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) =>
      property.getName()
    );

    const answers = await inquirer.prompt([
      {
        name: "property",
        message: "Select the property to add string validation:",
        type: "list",
        choices: propertyNames,
      },
      {
        name: "minLength",
        message:
          "Enter the minimum length of the string (leave empty for no minimum):",
        type: "input",
      },
      {
        name: "maxLength",
        message:
          "Enter the maximum length of the string (leave empty for no maximum):",
        type: "input",
      },
      {
        name: "regexPattern",
        message:
          "Enter a regular expression pattern to validate the string (leave empty for no pattern):",
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
        name: "String",
        arguments: [
          `{
            ${answers.minLength ? `minLength: ${answers.minLength},` : ""}
            ${answers.maxLength ? `maxLength: ${answers.maxLength},` : ""}
            ${
              answers.regexPattern
                ? `regexPattern: /${answers.regexPattern}/,`
                : ""
            }
            message: "${answers.message}",
          }`,
        ],
      });
    }
  }
}
