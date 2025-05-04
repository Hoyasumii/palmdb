import type { BaseEntity } from "@/core/entity/types";
import { PropertyBase } from "@/core/property/property-base";
import { BaseSchema, InferSchema } from "@/core/schema";
import type { OperationCost } from "@/global/types";
import { FindQueryable } from "@/global/types/queryable";

export interface FindCollectionInterface<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>,
  Entity extends BaseEntity<EntityType>
> {
  unique(
    query: FindQueryable<EntityType, Entity, "unique">["where"]
  ): Promise<Entity>;
  many(
    query: FindQueryable<EntityType, Entity, "many">
  ): Promise<Omit<OperationCost<Array<Entity>>, "affectedItems">>;
  countMany(
    query: Pick<FindQueryable<EntityType, Entity, "many">, "where">
  ): Promise<Omit<OperationCost<number>, "affectedItems">>;
}
