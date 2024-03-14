import { PropertyDeclaration } from "ts-morph";
import inquirer from "inquirer";
import { ValidationStrategy } from "./ValidationStrategy";

export class NumberStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) =>
      property.getName()
    );

    const answers = await inquirer.prompt([
      {
        name: "property",
        message: "Select the property to add number validation:",
        type: "list",
        choices: propertyNames,
      },
      {
        name: "min",
        message:
          "Enter the minimum allowed value (leave empty for no minimum):",
        type: "input",
      },
      {
        name: "max",
        message:
          "Enter the maximum allowed value (leave empty for no maximum):",
        type: "input",
      },
      {
        name: "integerOnly",
        message: "Should only integer numbers be allowed (true/false)?",
        type: "confirm",
      },
      {
        name: "positiveOnly",
        message: "Should only positive numbers be allowed (true/false)?",
        type: "confirm",
      },
      {
        name: "negativeOnly",
        message: "Should only negative numbers be allowed (true/false)?",
        type: "confirm",
      },
      {
        name: "precision",
        message:
          "Enter the maximum number of digits allowed after the decimal point (leave empty for any number of digits):",
        type: "input",
      },
      {
        name: "divisibleBy",
        message:
          "Enter the value that the number must be divisible by (leave empty for any value):",
        type: "input",
      },
      {
        name: "notEqualTo",
        message:
          "Enter an array of values that the number must not equal to (comma separated, leave empty for any value):",
        type: "input",
      },
      {
        name: "equalTo",
        message:
          "Enter an array of values that the number can specifically equal to (comma separated, leave empty for any value):",
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
        name: "Number",
        arguments: [
          `{
            ${answers.min ? `min: ${answers.min},` : ""}
            ${answers.max ? `max: ${answers.max},` : ""}
            integerOnly: ${answers.integerOnly},
            positiveOnly: ${answers.positiveOnly},
            negativeOnly: ${answers.negativeOnly},
            ${answers.precision ? `precision: ${answers.precision},` : ""}
            ${answers.divisibleBy ? `divisibleBy: ${answers.divisibleBy},` : ""}
            ${
              answers.notEqualTo
                ? `notEqualTo: [${answers.notEqualTo
                    .split(",")
                    .map((value: string) => value.trim())}],`
                : ""
            }
            ${
              answers.equalTo
                ? `equalTo: [${answers.equalTo
                    .split(",")
                    .map((value: string) => value.trim())}],`
                : ""
            }
            message: "${answers.message}",
          }`,
        ],
      });
    }
  }
}
