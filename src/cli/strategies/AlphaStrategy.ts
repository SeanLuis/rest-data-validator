import { PropertyDeclaration } from "ts-morph";
import inquirer from "inquirer";
import { ValidationStrategy } from "./ValidationStrategy";

export class IsAlphaStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) =>
      property.getName()
    );

    const answers = await inquirer.prompt([
      {
        name: "property",
        message: "Select the property to add IsAlpha validation:",
        type: "list",
        choices: propertyNames,
      },
      {
        name: "locale",
        message: "Enter the locale (default: 'en-US'):",
        type: "input",
        default: "en-US",
      },
      {
        name: "ignore",
        message: "Enter characters to ignore (leave blank if none):",
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
      const ignoreValue = answers.ignore
        ? `ignore: /[${answers.ignore}]/g,`
        : "";
      property.addDecorator({
        name: "IsAlpha",
        arguments: [
          `{
            locale: "${answers.locale}",
            ${ignoreValue}
            message: "${answers.message}",
          }`,
        ],
      });
    }
  }
}
