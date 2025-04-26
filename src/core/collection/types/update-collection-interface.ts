import type { BaseEntity } from "@/core/entity/types";
import type { OperationCost, Queryable } from "@/global/types";

export interface UpdateCollectionInterface<
  TargetType extends object,
  Entity extends BaseEntity<TargetType>
> {
  unique(id: string, data: Partial<TargetType>): Promise<Entity>;
  unique(id: string, data: (target: TargetType) => TargetType): Promise<Entity>;

  many(
    query: Queryable<TargetType, Entity, true, true>
  ): Promise<Required<OperationCost<Array<Entity>>>>;
  many(
    query: Queryable<TargetType, Entity, true, false>
  ): Promise<Required<OperationCost<Array<Entity>>>>;
}
