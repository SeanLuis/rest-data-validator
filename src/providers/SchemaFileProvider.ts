/**
 * The SchemaFileProvider class provides methods to load and convert schema definitions from JSON or YAML files into validation schemas.
 */
import * as fs from "fs";
import * as yaml from "js-yaml";
import * as path from "path";
import { SchemaValidator } from "../schemas/SchemaValidator";
import { ValidationSchemaBase } from "../schemas/types";

/**
 * The SchemaFileProvider class provides methods to load and convert schema definitions from JSON or YAML files into validation schemas.
 */
export class SchemaFileProvider {
  private static instance: SchemaFileProvider | null = null;
  private schemas: Record<string, any>;

  // Getter para obtener el valor actual de SCHEMA_FILE_PATH
  private static getDefaultSchemaFilePath(): string {
    return (
      process.env.SCHEMA_FILE_PATH ||
      path.resolve(__dirname, "../config/schemas")
    );
  }

  private constructor(filePath: string) {
    this.schemas = SchemaFileProvider.loadSchemaFromFile(filePath);
  }

  /**
   * Get the singleton instance of SchemaFileProvider.
   * @returns The SchemaFileProvider instance.
   */
  public static getInstance(): SchemaFileProvider {
    if (!SchemaFileProvider.instance) {
      const filePath = SchemaFileProvider.getSchemaFilePath();
      if (!filePath) {
        throw new Error(
          `No valid schema file found at ${SchemaFileProvider.getDefaultSchemaFilePath()}`
        );
      }
      SchemaFileProvider.instance = new SchemaFileProvider(filePath);
    }
    return SchemaFileProvider.instance;
  }

  /**
   * Determine the schema file path, either by respecting the provided path or by deducing the extension.
   * @returns The full path to the schema file or null if not found.
   */
  private static getSchemaFilePath(): string | null {
    const defaultPath = SchemaFileProvider.getDefaultSchemaFilePath();

    // Check if the provided path has an extension
    const ext = path.extname(defaultPath);
    if (ext) {
      // If an extension is provided, ensure it's valid
      if ([".json", ".yaml", ".yml"].includes(ext)) {
        const resolvedPath = path.resolve(defaultPath);
        if (fs.existsSync(resolvedPath)) {
          return resolvedPath;
        }
        throw new Error(
          `Schema file with path ${resolvedPath} does not exist.`
        );
      } else {
        throw new Error(`Unsupported file type: ${ext}`);
      }
    } else {
      // If no extension is provided, try to deduce the file with valid extensions
      const foundFile = SchemaFileProvider.findSchemaFile(defaultPath);
      if (!foundFile) {
        throw new Error(
          `No valid schema file found at base path ${defaultPath}`
        );
      }
      return foundFile;
    }
  }

  /**
   * Load schema from either a JSON or YAML file.
   * @param filePath - The path to the schema file (with or without extension).
   * @returns The schema definition object.
   */
  public static loadSchemaFromFile(filePath: string): Record<string, any> {
    const ext = path.extname(filePath).slice(1); // Get the extension without the dot
    const fileContent = fs.readFileSync(filePath, "utf-8");

    if (ext === "yaml" || ext === "yml") {
      return yaml.load(fileContent) as Record<string, any>;
    } else if (ext === "json") {
      return JSON.parse(fileContent);
    } else {
      throw new Error("Unsupported file type.");
    }
  }

  /**
   * Find a valid schema file with either .json or .yaml/.yml extension.
   * @param basePath - The base path where the schema files are located (without extension).
   * @returns The full path to a valid schema file or null if not found.
   */
  private static findSchemaFile(basePath: string): string | null {
    const possibleExtensions = ["json", "yaml", "yml"];
    for (const ext of possibleExtensions) {
      const fullPath = path.resolve(`${basePath}.${ext}`);
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    }
    return null;
  }

  /**
   * Get the validation schema for a specific entity.
   * @param entity - The entity name.
   * @returns An instance of ValidationSchemaBase for the specified entity.
   */
  public get(entity: string): ValidationSchemaBase<any> {
    const definition = this.schemas[entity];
    if (!definition) {
      throw new Error(`Schema for entity "${entity}" not found.`);
    }
    return SchemaFileProvider.convertToSchema(definition);
  }

  /**
   * Convert a schema definition object to a ValidationSchemaBase instance.
   * @param definition - The schema definition object.
   * @returns An instance of ValidationSchemaBase.
   */
  public static convertToSchema(definition: any): ValidationSchemaBase<any> {
    let schema: ValidationSchemaBase<any>;

    switch (definition.type) {
      case "string": {
        let stringSchema = SchemaValidator.string();
        if (definition.minLength) {
          stringSchema = stringSchema.min(definition.minLength);
        }
        if (definition.maxLength) {
          stringSchema = stringSchema.max(definition.maxLength);
        }
        if (definition.required) {
          stringSchema = stringSchema.required(true);
        }
        schema = stringSchema;
        break;
      }

      case "number": {
        let numberSchema = SchemaValidator.number();
        if (definition.minimum) {
          numberSchema = numberSchema.min(definition.minimum);
        }
        if (definition.maximum) {
          numberSchema = numberSchema.max(definition.maximum);
        }
        if (definition.required) {
          numberSchema = numberSchema.required(true);
        }
        schema = numberSchema;
        break;
      }

      case "boolean": {
        let booleanSchema = SchemaValidator.boolean();
        if (definition.required) {
          booleanSchema = booleanSchema.required(true);
        }
        schema = booleanSchema;
        break;
      }

      case "object": {
        const properties = definition.properties || {};
        const required = new Set(definition.required || []);
        let objectSchema = SchemaValidator.object(
          Object.keys(properties).reduce((acc, key) => {
            const propertySchema = SchemaFileProvider.convertToSchema(
              properties[key]
            );
            acc[key] = required.has(key)
              ? propertySchema.required(true)
              : propertySchema;
            return acc;
          }, {} as Record<string, any>)
        );
        schema = objectSchema;
        break;
      }

      case "array": {
        const itemSchema = SchemaFileProvider.convertToSchema(definition.items);
        let arraySchema = SchemaValidator.array(itemSchema); // Especificamos que es un esquema de tipo array
        if (definition.minItems) {
          arraySchema = arraySchema.min(definition.minItems);
        }
        if (definition.maxItems) {
          arraySchema = arraySchema.max(definition.maxItems);
        }
        if (definition.required) {
          arraySchema = arraySchema.required(true);
        }
        schema = arraySchema;
        break;
      }

      case "union": {
        const unionSchemas = definition.schemas.map((schemaDef: any) =>
          SchemaFileProvider.convertToSchema(schemaDef)
        );
        schema = SchemaValidator.union(unionSchemas);
        break;
      }

      case "enum": {
        schema = SchemaValidator.enum(definition.allowedValues);
        break;
      }

      case "literal": {
        schema = SchemaValidator.literal(definition.value);
        break;
      }

      case "nullable": {
        const innerSchema = SchemaFileProvider.convertToSchema(
          definition.schema
        );
        schema = SchemaValidator.nullable(innerSchema);
        break;
      }

      case "tuple": {
        const tupleSchemas = definition.items.map((itemDef: any) =>
          SchemaFileProvider.convertToSchema(itemDef)
        );
        schema = SchemaValidator.tuple(tupleSchemas);
        break;
      }

      case "transform": {
        const innerSchema = SchemaFileProvider.convertToSchema(
          definition.schema
        );
        const transformFn = new Function("value", definition.transformFn) as (
          value: any
        ) => any;
        schema = SchemaValidator.transform(innerSchema, transformFn);
        break;
      }

      case "record": {
        const keySchema = SchemaFileProvider.convertToSchema(
          definition.keySchema
        );
        const valueSchema = SchemaFileProvider.convertToSchema(
          definition.valueSchema
        );
        schema = SchemaValidator.record(keySchema, valueSchema);
        break;
      }

      case "any": {
        schema = SchemaValidator.any();
        break;
      }

      case "lazy": {
        const innerSchema = SchemaFileProvider.convertToSchema(
          definition.schema
        );
        const propertyName = definition.propertyName;
        schema = SchemaValidator.lazy(() => innerSchema, propertyName);
        break;
      }

      default:
        throw new Error(`Unsupported schema type: ${definition.type}`);
    }

    /**
     * Marks the schema as nullable, allowing the value to be null or the defined schema.
     */
    if (definition.nullable) {
      schema = schema.nullable(true);
    }

    /**
     * Marks the schema as not required, allowing the value to be undefined.
     */
    if (!definition.required) {
      schema = schema.required(false);
    }

    return schema;
  }
}

export const getSchema = (entity: string) =>
  SchemaFileProvider.getInstance().get(entity);
export const loadSchemaFromFile =
  SchemaFileProvider.loadSchemaFromFile.bind(SchemaFileProvider);
export const convertToSchema =
  SchemaFileProvider.convertToSchema.bind(SchemaFileProvider);
