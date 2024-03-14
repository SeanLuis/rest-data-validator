import { PropertyDeclaration } from "ts-morph";
import inquirer from "inquirer";
import { ValidationStrategy } from "./ValidationStrategy";

export class CustomStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) =>
      property.getName()
    );

    const answers = await inquirer.prompt([
      {
        name: "validationName",
        message: "Enter the validation name:",
        type: "input",
      },
      {
        name: "property",
        message: "Select the property to add custom validations:",
        type: "list",
        choices: propertyNames,
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
        name: "Custom",
        arguments: [
          `{
            name: "${answers.validationName}",
            validate: (value: any) => {
              // TODO: Replace this with your custom validation logic
              return true; // Placeholder return value
            },
            message: "${answers.message}",
          }`,
        ],
      });
    }
  }
}
