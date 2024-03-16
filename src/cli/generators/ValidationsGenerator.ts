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
  StringStrategy
} from '../strategies';

const validationTypes = [
  'Required',
  'Custom',
  'Array',
  'Date',
  'Domain',
  'Enum',
  'File',
  'Number',
  'Range',
  'Regex',
  'String',
  'Nested',
  'Contextual',
  'Email',
  'Password',
  'Dependency',
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
  String: StringStrategy
};

export class ValidationsGenerator {
  static async generate(modelPath: string) {
    const project = new Project();
    const fullPath = path.join(process.cwd(), modelPath);
    const sourceFile = project.addSourceFileAtPath(fullPath);
    const classes = sourceFile.getClasses();

    const answers = await inquirer.prompt([
      {
        name: 'validationType',
        message: 'Validation type:',
        type: 'list',
        choices: validationTypes,
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
  }
}