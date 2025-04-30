import type { BaseEntity } from "@/core/entity/types";
import { PropertyBase } from "@/core/property/property-base";
import { BaseSchema, InferSchema } from "@/core/schema";
import type { OperationCost, Queryable } from "@/global/types";

export interface FindCollectionInterface<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>,
  Entity extends BaseEntity<EntityType>
> {
  unique(id: string): Promise<Entity>;
  many(
    query: Queryable<EntityType, Entity, false, false>
  ): Promise<Omit<OperationCost<Array<Entity>>, "affectedItems">>;
  countMany(
    query: Pick<Queryable<EntityType, Entity, false, false>, "where">
  ): Promise<Omit<OperationCost<number>, "affectedItems">>;
}
