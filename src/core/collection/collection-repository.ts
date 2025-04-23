import type { BaseSchema, InferSchema, SchemaValidator } from "@/core/schema";
import type { PropertyBase } from "@/core/property/property-base";
import type { Coconut, Entity } from "@/core";

export class CollectionRepository<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> {
  constructor(
    public items: Record<string, Entity<EntityType>>,
    public coconut: Coconut,
    public schema: EntityType,
    public validator: SchemaValidator<Keys, Schema, EntityType>,
    public randomUUID: () => string,
    public save: () => Promise<void>
  ) {
    if (new.target !== CollectionRepository) throw new Error();
  }
}
