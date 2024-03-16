import { PropertyDeclaration } from "ts-morph";
import inquirer from "inquirer";
import { ValidationStrategy } from "./ValidationStrategy";

export class RegexStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) =>
      property.getName()
    );

    const answers = await inquirer.prompt([
      {
        name: "property",
        message: "Select the property to add regex validation:",
        type: "list",
        choices: propertyNames,
      },
      {
        name: "pattern",
        message: "Enter the regular expression pattern for validation:",
        type: "input",
      },
      {
        name: "flags",
        message:
          "Enter the flags for the regular expression (leave empty for no flags):",
        type: "input",
      },
      {
        name: "invertMatch",
        message: "Should the matching criteria be inverted (true/false)?",
        type: "confirm",
      },
      {
        name: "testAgainstTrimmedValue",
        message:
          "Should the regular expression be tested against the trimmed value (true/false)?",
        type: "confirm",
      },
      {
        name: "allowEmptyString",
        message:
          "Should an empty string be allowed as valid regardless of the pattern (true/false)?",
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
        name: "Regex",
        arguments: [
          `{
            pattern: /${answers.pattern}/${answers.flags || ""},
            invertMatch: ${answers.invertMatch},
            testAgainstTrimmedValue: ${answers.testAgainstTrimmedValue},
            allowEmptyString: ${answers.allowEmptyString},
            message: "${answers.message}",
          }`,
        ],
      });
    }
  }
}
