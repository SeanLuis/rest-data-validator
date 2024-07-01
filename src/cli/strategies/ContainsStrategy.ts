import { PropertyDeclaration } from "ts-morph";
import inquirer from "inquirer";
import { ValidationStrategy } from "./ValidationStrategy";

export class ContainsStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) =>
      property.getName()
    );

    const answers = await inquirer.prompt([
      {
        name: "property",
        message: "Select the property to add contains validation:",
        type: "list",
        choices: propertyNames,
      },
      {
        name: "seed",
        message: "Enter the seed (substring to check for):",
        type: "input",
      },
      {
        name: "ignoreCase",
        message: "Ignore case? (true/false):",
        type: "confirm",
      },
      {
        name: "minOccurrences",
        message: "Enter the minimum number of occurrences:",
        type: "number",
        default: 1,
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
        name: "Contains",
        arguments: [
          `{
            seed: "${answers.seed}",
            ignoreCase: ${answers.ignoreCase},
            minOccurrences: ${answers.minOccurrences},
            message: "${answers.message}",
          }`,
        ],
      });
    }
  }
}
