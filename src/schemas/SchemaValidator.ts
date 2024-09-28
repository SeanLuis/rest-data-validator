import {
  StringSchema,
  NumberSchema,
  BooleanSchema,
  ObjectSchema,
  ArraySchema,
  UnionSchema,
  EnumSchema,
  DateSchema,
  TupleSchema,
  RecordSchema,
  NullableSchema,
  AnySchema,
  LazySchema,
  LiteralSchema,
  TransformSchema,
  ValidationSchemaBase,
  OptionalSchema,
} from "./types";

export class SchemaValidator {
  /**
   * Creates a new instance of StringSchema.
   * @returns {StringSchema} A new StringSchema instance.
   */
  static string(): StringSchema {
    return new StringSchema();
  }

  /**
   * Creates a new instance of NumberSchema.
   * @returns {NumberSchema} A new NumberSchema instance.
   */
  static number(): NumberSchema {
    return new NumberSchema();
  }

  /**
   * Creates a new instance of BooleanSchema.
   * @returns {BooleanSchema} A new BooleanSchema instance.
   */
  static boolean(): BooleanSchema {
    return new BooleanSchema();
  }

  /**
   * Creates a new instance of ObjectSchema.
   * @param schemaDefinition - The definition of the object schema.
   * @returns {ObjectSchema} A new ObjectSchema instance.
   */
  static object(schemaDefinition: Record<string, any>): ObjectSchema {
    return new ObjectSchema(schemaDefinition);
  }

  /**
   * Creates a new instance of ArraySchema.
   * @param itemSchema - The schema for the items in the array.
   * @returns {ArraySchema} A new ArraySchema instance.
   */
  static array<T>(itemSchema: ValidationSchemaBase<T>): ArraySchema<T> {
    return new ArraySchema<T>(itemSchema);
  }

  /**
   * Creates a new instance of UnionSchema.
   * @param schemas - An array of schemas to union.
   * @returns {UnionSchema} A new UnionSchema instance.
   */
  static union<T extends any[]>(schemas: { [K in keyof T]: ValidationSchemaBase<T[K]> }): UnionSchema<T[number]> {
    return new UnionSchema(schemas);
  }

  /**
   * Creates a new instance of EnumSchema.
   * @param allowedValues - The allowed values for the enum.
   * @returns {EnumSchema} A new EnumSchema instance.
   */
  static enum(allowedValues: any[]): EnumSchema<any> {
    return new EnumSchema(allowedValues);
  }

  /**
   * Creates a new instance of DateSchema.
   * @returns {DateSchema} A new DateSchema instance.
   */
  static date(): DateSchema {
    return new DateSchema();
  }

  /**
   * Creates a new instance of TupleSchema.
   * @param schemas - The array of schemas for each element of the tuple.
   * @returns {TupleSchema} A new TupleSchema instance.
   */
  static tuple<T extends any[]>(schemas: {
    [K in keyof T]: ValidationSchemaBase<T[K]>;
  }): TupleSchema<T> {
    return new TupleSchema(schemas);
  }

  /**
   * Creates a new instance of RecordSchema.
   * @param keySchema - The schema for the keys of the record.
   * @param valueSchema - The schema for the values of the record.
   * @returns {RecordSchema} A new RecordSchema instance.
   */
  static record<K extends string | number | symbol, V>(
    keySchema: ValidationSchemaBase<K>,
    valueSchema: ValidationSchemaBase<V>
  ): RecordSchema<K, V> {
    return new RecordSchema(keySchema, valueSchema);
  }

  /**
   * Creates a new instance of NullableSchema.
   * @param schema - The schema to be used if the value is not null.
   * @returns {NullableSchema} A new NullableSchema instance.
   */
  static nullable<T>(schema: ValidationSchemaBase<T>): NullableSchema<T> {
    return new NullableSchema(schema);
  }

  /**
   * Creates a new instance of AnySchema.
   * @returns {AnySchema} A new AnySchema instance.
   */
  static any(): AnySchema {
    return new AnySchema();
  }

  /**
   * Creates a new instance of LazySchema.
   * @param schemaFactory - A function that lazily produces a schema.
   * @returns {LazySchema} A new LazySchema instance.
   */
  static lazy<T>(schemaFactory: () => ValidationSchemaBase<T>, propertyName?: string): LazySchema<T> {
    return new LazySchema(schemaFactory, propertyName);
  }

  /**
   * Creates a new instance of LiteralSchema.
   * @param literalValue - The literal value that the schema will validate against.
   * @returns {LiteralSchema} A new LiteralSchema instance.
   */
  static literal<T extends string | number | boolean>(
    literalValue: T
  ): LiteralSchema<T> {
    return new LiteralSchema(literalValue);
  }

  /**
   * Creates a new instance of TransformSchema.
   * @param schema - The schema to be used for validation.
   * @param transformFn - The transformation function to be applied to the value.
   * @returns {TransformSchema} A new TransformSchema instance.
   */
  static transform<T>(
    schema: ValidationSchemaBase<T>,
    transformFn: (value: T) => T
  ): TransformSchema<T> {
    return new TransformSchema(schema, transformFn);
  }

  /**
   * Creates a new instance of OptionalSchema.
   * @param schema - The schema for the optional value.
   * @returns {OptionalSchema} A new OptionalSchema instance.
   */
  static optional<T>(schema: ValidationSchemaBase<T>): OptionalSchema<T> {
    return new OptionalSchema(schema);
  }
}
