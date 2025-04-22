import type { PropertyImpl } from "@/core/property/property-base";
import type { BaseSchema } from "./base-schema";
import type { InferSchema } from "./infer-schema";
import type { SchemaValidator } from "./types";

export class SchemaUtils<
  Keys extends string,
  Schema extends Record<Keys, PropertyImpl>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> implements SchemaValidator<Keys, Schema, EntityType>
{
  constructor(private readonly schema: unknown) {}

  private propertyIsMatching(key: unknown, property: unknown) {}

  validate(entity: EntityType) {
    return true;
  }
}
