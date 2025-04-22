import type { PropertyImpl } from "@/core/property/property-base";
import type { InferSchema, BaseSchema } from "@/core/schema";

export interface SchemaValidator<
  Keys extends string,
  Schema extends Record<Keys, PropertyImpl>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> {
  validate(entity: EntityType): boolean;
}
