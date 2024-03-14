import { ClassDeclaration, Project, SourceFile } from "ts-morph";

export class ValidationStrategy {
  constructor(protected project: Project, protected sourceFile: SourceFile, protected classes: ClassDeclaration[]) {}

  async execute() {
    throw new Error('Method execute() must be implemented');
  }
}