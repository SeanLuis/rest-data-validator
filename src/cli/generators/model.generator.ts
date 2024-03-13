import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import inquirer from 'inquirer';
import { trim } from '../../';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ModelGenerator {
  static async generate(name: string, modelPath: string) {
    const className = this.formatClassName(name);

    const properties = await this.askForProperties();

    const modelTemplate = this.createModelTemplate(className, properties);

    const pathToProjectRoot = path.join(__dirname, '..', '..');
    const fullPath = path.join(pathToProjectRoot, modelPath, `${className}.ts`);

    fs.mkdirSync(path.dirname(fullPath), { recursive: true });

    fs.writeFileSync(fullPath, modelTemplate);
    console.log(`Modelo ${className} generado con éxito en ${fullPath}`);
  }

  private static formatClassName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  private static async askForProperties() {
    const properties = [];
    let addMore = true;

    const validTypes = ['string', 'number', 'boolean', 'object', 'any', 'void', 'null', 'undefined'];

    while (addMore) {
      const answers = await inquirer.prompt([
        {
          name: 'propertyName',
          message: 'Property name:',
          type: 'input',
          validate: input => {
            const sanitizedInput = trim(input);
            return /^[_a-zA-Z][_a-zA-Z0-9]*$/.test(sanitizedInput) || 'Invalid property name.';
          },
          filter: input => {
            return trim(input);
          },
        },
        {
          name: 'type',
          message: 'Datatype:',
          type: 'input',
          validate: input => {
            return validTypes.includes(input) || `Invalid data type. Valid types are: ${validTypes.join(', ')}.`;
          },
        },
        {
          name: 'addMore',
          message: 'Do you want to add another property?',
          type: 'confirm',
        },
      ]);

      properties.push({
        name: answers.propertyName,
        type: answers.type,
      });

      addMore = answers.addMore;
    }

    return properties;
  }

  private static createModelTemplate(className: string, properties: any[]): string {
    const importStatement = `import "reflect-metadata";\nimport { ClassValidator, Accessors } from "../../src";\n\n`;
    const classValidatorDecorator = `@ClassValidator\n`;

    const propertiesStr = properties.map(prop => `  public ${prop.name}: ${prop.type};`).join('\n');

    const constructorArguments = properties.map(prop => `${prop.name}: ${prop.type}`).join(', ');
    const constructorBody = properties.map(prop => `    this.${prop.name} = ${prop.name};`).join('\n');

    return `${importStatement}${classValidatorDecorator}export class ${className} {\n${propertiesStr}\n\n  constructor(${constructorArguments}) {\n${constructorBody}\n  }\n}`;
  }
}
