import { PropertyDeclaration } from "ts-morph";
import inquirer from "inquirer";
import { ValidationStrategy } from "./ValidationStrategy";

export class PasswordStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) =>
      property.getName()
    );

    const answers = await inquirer.prompt([
      {
        name: "property",
        message: "Select the property to add password validation:",
        type: "list",
        choices: propertyNames,
      },
      {
        name: "minLength",
        message:
          "Enter the minimum length of the password (leave empty for no minimum):",
        type: "input",
      },
      {
        name: "maxLength",
        message:
          "Enter the maximum length of the password (leave empty for no maximum):",
        type: "input",
      },
      {
        name: "regexPattern",
        message:
          "Enter a regular expression pattern to validate the password against (leave empty for no pattern):",
        type: "input",
      },
      {
        name: "mustContainLowercase",
        message:
          "Should the password contain at least one lowercase letter (true/false)?",
        type: "confirm",
      },
      {
        name: "mustContainUppercase",
        message:
          "Should the password contain at least one uppercase letter (true/false)?",
        type: "confirm",
      },
      {
        name: "mustContainNumber",
        message:
          "Should the password contain at least one number (true/false)?",
        type: "confirm",
      },
      {
        name: "mustContainSpecialCharacter",
        message:
          "Should the password contain at least one special character (true/false)?",
        type: "confirm",
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
        name: "Password",
        arguments: [
          `{
            ${answers.minLength ? `minLength: ${answers.minLength},` : ""}
            ${answers.maxLength ? `maxLength: ${answers.maxLength},` : ""}
            ${
              answers.regexPattern
                ? `regexPattern: /${answers.regexPattern}/,`
                : ""
            }
            mustContainLowercase: ${answers.mustContainLowercase},
            mustContainUppercase: ${answers.mustContainUppercase},
            mustContainNumber: ${answers.mustContainNumber},
            mustContainSpecialCharacter: ${answers.mustContainSpecialCharacter},
            message: "${answers.message}",
          }`,
        ],
      });
    }
  }
}
