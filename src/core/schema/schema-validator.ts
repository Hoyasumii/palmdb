import type { SchemaValidator } from "./types";

export class SchemaUtils implements SchemaValidator {
  constructor(private schema: unknown) {}

  private propertyIsMatching(key: unknown, property: unknown) {}
  
  validate() {}
}
