import { PropertyDeclaration } from 'ts-morph';
import inquirer from 'inquirer';
import { ValidationStrategy } from './validation.strategy';

export class FileStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) => property.getName());

    const answers = await inquirer.prompt([
      {
        name: 'property',
        message: 'Select the property to add file validation:',
        type: 'list',
        choices: propertyNames,
      },
      {
        name: 'mimeTypes',
        message: 'Enter the allowed MIME types (comma separated):',
        type: 'input',
      },
      {
        name: 'maxSize',
        message: 'Enter the maximum file size in bytes:',
        type: 'input',
      },
      {
        name: 'minSize',
        message: 'Enter the minimum file size in bytes:',
        type: 'input',
      },
      {
        name: 'allowedExtensions',
        message: 'Enter the allowed file extensions (comma separated):',
        type: 'input',
      },
      {
        name: 'disallowedExtensions',
        message: 'Enter the disallowed file extensions (comma separated):',
        type: 'input',
      },
      {
        name: 'message',
        message: 'Validation error message:',
        type: 'input',
      }
    ]);

    const property = this.classes[0].getProperties().find(p => p.getName() === answers.property);
    if (property) {
      property.addDecorator({
        name: 'File',
        arguments: [
          `{
            mimeTypes: [${answers.mimeTypes.split(',').map((mimeType: string) => `"${mimeType.trim()}"`)}],
            maxSize: ${answers.maxSize},
            minSize: ${answers.minSize},
            allowedExtensions: [${answers.allowedExtensions.split(',').map((extension: string) => `"${extension.trim()}"`)}],
            disallowedExtensions: [${answers.disallowedExtensions.split(',').map((extension: string) => `"${extension.trim()}"`)}],
            message: "${answers.message}",
          }`
        ]
      });
    }
  }
}