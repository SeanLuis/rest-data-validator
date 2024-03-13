#!/usr/bin/env node

import { program } from 'commander';
import { ModelGenerator } from './generators/model.generator';
import { ValidationsGenerator } from './generators/validations.generator';

program
  .version('1.0.0')
  .description('CLI para la generación de modelos y aplicación de validaciones');

program
  .command('generate:model <name> [path]')
  .description('Genera un nuevo modelo')
  .action((name: string, path: string = '') => {
    ModelGenerator.generate(name, path);
  });

program
  .command('generate:validations <modelName>')
  .description('Aplica validaciones a un modelo existente')
  .action((modelName: string) => {
    ValidationsGenerator.generate(modelName);
  });

program.parse(process.argv);
