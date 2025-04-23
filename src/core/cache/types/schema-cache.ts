export type SchemaCache<Keys extends string> = Record<
  Keys,
  Record<string, null>
>;
