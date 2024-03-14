import { PropertyDeclaration } from 'ts-morph';
import inquirer from 'inquirer';
import { ValidationStrategy } from './validation.strategy';

export class DomainStrategy extends ValidationStrategy {
  async execute() {
    const properties = this.classes[0].getProperties();
    const propertyNames = properties.map((property: PropertyDeclaration) => property.getName());

    const answers = await inquirer.prompt([
      {
        name: 'property',
        message: 'Select the property to add domain validation:',
        type: 'list',
        choices: propertyNames,
      },
      {
        name: 'type',
        message: 'Enter the domain type:',
        type: 'list',
        choices: ["url", "email", "uuid", "isoCountryCode", "isoLanguageCode"],
      }
    ]);

    let additionalQuestions = [];
    switch (answers.type) {
      case 'url':
        additionalQuestions.push({
          name: 'mustBeSecure',
          message: 'Should the domain be secure (true/false)?',
          type: 'confirm',
        });
        break;
      case 'isoCountryCode':
      case 'isoLanguageCode':
        additionalQuestions.push(
          {
            name: 'isoCodes',
            message: `Enter ISO ${answers.type === 'isoCountryCode' ? 'country' : 'language'} codes (comma separated):`,
            type: 'input',
          },
          {
            name: 'isoCodePath',
            message: `Enter the path to a JSON file containing ISO ${answers.type === 'isoCountryCode' ? 'country' : 'language'} codes:`,
            type: 'input',
          },
          {
            name: 'jsonProperty',
            message: 'Enter the property of the JSON to be verified:',
            type: 'input',
          }
        );
        break;
    }

    additionalQuestions.push({
      name: 'message',
      message: 'Validation error message:',
      type: 'input',
    });


    const additionalAnswers = await inquirer.prompt(additionalQuestions);

    const property = this.classes[0].getProperties().find(p => p.getName() === answers.property);
    if (property) {
      property.addDecorator({
        name: 'Domain',
        arguments: [
          `{
            type: "${answers.type}",
            ${answers.type === 'url' 
              ? `mustBeSecure: ${additionalAnswers.mustBeSecure},` 
              : ''}
            ${['isoCountryCode', 'isoLanguageCode'].includes(answers.type) 
              ? `isoCodes: [${additionalAnswers.isoCodes.split(',').map((code: string) => `"${code.trim()}"`)}],` 
              : ''}
            ${['isoCountryCode', 'isoLanguageCode'].includes(answers.type) 
              ? `isoCodePath: "${additionalAnswers.isoCodePath}",` 
              : ''}
            ${['isoCountryCode', 'isoLanguageCode'].includes(answers.type) 
              ? `jsonProperty: "${additionalAnswers.jsonProperty}",` 
              : ''}
            message: "${answers.message}",
          }`
        ]
      });
    }
  }
}