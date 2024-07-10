import path from 'path';
import inquirer from 'inquirer';
import { Project } from 'ts-morph';
import {
  RequiredStrategy,
  ArrayStrategy,
  ContextualStrategy,
  CustomStrategy,
  DependencyStrategy,
  DateStrategy,
  DomainStrategy,
  EmailStrategy,
  EnumStrategy,
  FileStrategy,
  NestedStrategy,
  NumberStrategy,
  PasswordStrategy,
  RangeStrategy,
  RegexStrategy,
  StringStrategy,
  SecurityStrategy,
  BICStrategy,
  ISO31661Alpha2Strategy
} from '../strategies';

const validationTypes = [
  { name: 'Required', description: 'Ensures the property is not null or undefined' },
  { name: 'Custom', description: 'Allows for custom validation logic' },
  { name: 'Array', description: 'Validates array properties' },
  { name: 'Date', description: 'Validates date properties' },
  { name: 'Domain', description: 'Validates domain names' },
  { name: 'Enum', description: 'Validates that a value is part of a specific enum' },
  { name: 'File', description: 'Validates file properties' },
  { name: 'Number', description: 'Validates numerical properties' },
  { name: 'Range', description: 'Validates that a number is within a specified range' },
  { name: 'Regex', description: 'Validates using a regular expression' },
  { name: 'String', description: 'Validates string properties' },
  { name: 'Nested', description: 'Validates nested objects' },
  { name: 'Contextual', description: 'Contextual validation based on other properties' },
  { name: 'Email', description: 'Validates email addresses' },
  { name: 'Password', description: 'Validates password strength' },
  { name: 'Dependency', description: 'Validation based on other property values' },
  { name: 'Security', description: 'Validates security-related properties' },
  { name: 'BIC', description: 'Validates Bank Identification Codes (BIC)' },
  { name: 'ISO31661Alpha2', description: 'Validates ISO 3166-1 alpha-2 country codes' }
];

const strategies: any = {
  Required: RequiredStrategy,
  Array: ArrayStrategy,
  Contextual: ContextualStrategy,
  Custom: CustomStrategy,
  Dependency: DependencyStrategy,
  Date: DateStrategy,
  Domain: DomainStrategy,
  Email: EmailStrategy,
  Enum: EnumStrategy,
  File: FileStrategy,
  Nested: NestedStrategy,
  Number: NumberStrategy,
  Password: PasswordStrategy,
  Range: RangeStrategy,
  Regex: RegexStrategy,
  String: StringStrategy,
  Security: SecurityStrategy,
  BIC: BICStrategy,
  ISO31661Alpha2: ISO31661Alpha2Strategy
};

export class ValidationsGenerator {
  static async generate(modelPath: string) {
    const project = new Project();
    const fullPath = path.join(process.cwd(), modelPath);
    const sourceFile = project.addSourceFileAtPath(fullPath);
    const classes = sourceFile.getClasses();

    let continueAdding = true;

    while (continueAdding) {
      const answers = await inquirer.prompt([
        {
          name: 'validationType',
          message: 'Validation type:',
          type: 'list',
          choices: validationTypes.map(type => ({
            name: `${type.name} - ${type.description}`,
            value: type.name
          })),
        },
      ]);

      const strategy = new strategies[answers.validationType](project, sourceFile, classes);

      // Add import if it doesn't exist
      let importDeclaration = sourceFile.getImportDeclaration(declaration => declaration.getModuleSpecifierValue() === 'rest-data-validator');
      if (!importDeclaration) {
        importDeclaration = sourceFile.addImportDeclaration({
          namedImports: [answers.validationType],
          moduleSpecifier: 'rest-data-validator'
        });
      } else {
        const namedImports = importDeclaration.getNamedImports();
        if (!namedImports.find(i => i.getText() === answers.validationType)) {
          importDeclaration.addNamedImport(answers.validationType);
        }
      }

      await strategy.execute();

      sourceFile.formatText();
      await project.save();

      const { addMore } = await inquirer.prompt([
        {
          name: 'addMore',
          message: 'Do you want to add another validation?',
          type: 'confirm',
          default: false,
        },
      ]);

      continueAdding = addMore;
    }
  }
}
