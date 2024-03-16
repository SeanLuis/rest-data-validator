#!/usr/bin/env node

import { program } from "commander";
import { ModelGenerator } from "./generators/ModelGenerator";
import { ValidationsGenerator } from "./generators/ValidationsGenerator";

program
  .version("1.0.0")
  .description(
    "CLI for generating models and applying validations"
  );

program
  .command("generate:model <name> [path]")
  .description("Generate a new model")
  .action((name: string, path: string = "") => {
    ModelGenerator.generate(name, path);
  });

program
  .command("generate:validations <modelPath>")
  .description("Apply validations to an existing model")
  .action((modelPath: string) => {
    ValidationsGenerator.generate(modelPath);
  });

program.parse(process.argv);
