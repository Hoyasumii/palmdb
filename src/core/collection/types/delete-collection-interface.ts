import type { BaseEntity } from "@/core/entity/types";
import type { OperationCost, Queryable } from "@/global/types";

export interface DeleteCollectionInterface<
  TargetType extends object,
  Entity extends BaseEntity<TargetType>
> {
  unique(id: string): Promise<Entity>;
  many(
    query: Queryable<TargetType, Entity, false, false>
  ): Promise<OperationCost<Array<Entity>>>;
}
