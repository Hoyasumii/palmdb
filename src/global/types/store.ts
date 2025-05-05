import { Entity } from "@/core";
import { PropertyBase } from "@/core/property/property-base";
import { BaseSchema, InferSchema } from "@/core/schema";

export interface Store<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> {
  hash: Record<string, Entity<EntityType>>;
  serializedHash: Record<string, EntityType>;
  iterIndexed: Record<string, number>;
  iter: Array<Entity<EntityType>>;
  count: number;
}
