import { PropertyDeclaration } from "ts-morph";
import inquirer from "inquirer";
import { ValidationStrategy } from "./ValidationStrategy";

export class ContextualStrategy extends ValidationStrategy {
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
        message: "Select the property to add contextual validation:",
        type: "list",
        choices: propertyNames,
      },
      {
        name: "contextKey",
        message: 'Enter the context key (e.g., "documentAccess"):',
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
        name: "Contextual",
        arguments: [
          `{
            name: "${answers.validationName}",
            getContext: () => getContext("${answers.contextKey}"),
            validate: (value, context) => {
              // TODO: Replace this function with your validation logic
              // Example: return context.userRole === "admin";
              return true; // Placeholder return value
            },
            message: "${answers.message}",
          }`,
        ],
      });
    }
  }
}
