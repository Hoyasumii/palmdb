import type { BaseEntity } from "@/core/entity/types";
import { PropertyBase } from "@/core/property/property-base";
import { BaseSchema, InferSchema } from "@/core/schema";
import type { OperationCost } from "@/global/types";
import { UpdateQueryable } from "@/global/types/queryable";

export interface UpdateCollectionInterface<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>,
  Entity extends BaseEntity<EntityType>
> {
  unique(
    query: UpdateQueryable<EntityType, Entity, "unique", "update-partial">
  ): Promise<Entity>;
  unique(
    query: UpdateQueryable<EntityType, Entity, "unique", "update-function">
  ): Promise<Entity>;

  many(
    query: UpdateQueryable<EntityType, Entity, "many", "update-partial">
  ): Promise<Required<OperationCost<Array<Entity>>>>;
  many(
    query: UpdateQueryable<EntityType, Entity, "many", "update-function">
  ): Promise<Required<OperationCost<Array<Entity>>>>;
}
