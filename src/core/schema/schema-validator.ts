import type { PropertyBase } from "@/core/property/property-base";
import type { BaseSchema } from "./base-schema";
import type { InferSchema } from "./infer-schema";

export class SchemaValidator<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> {
  constructor(private readonly schema: Schema) {}

  private propertyIsMatching(key: Keys, property: EntityType[Keys]): boolean {
    // this.schema[key]
  }

  validate(entity: EntityType) {
    return true;
  }
}
