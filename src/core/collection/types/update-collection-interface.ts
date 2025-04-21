import type { BaseEntity } from "@/core/entity/types";
import type { OperationCost } from "@/global/types";

export interface UpdateCollectionInterface<
  TargetType extends object,
  Entity extends BaseEntity<TargetType>,
> {
  unique(id: string, data: Partial<TargetType>): Promise<Entity>;
  unique(id: string, data: (target: TargetType) => TargetType): Promise<Entity>;

  many(
    where: (target: Entity) => boolean,
    data: Partial<TargetType>,
  ): Promise<Required<OperationCost<Array<Entity>>>>;
  many(
    where: (target: Entity) => boolean,
    data: (target: TargetType) => TargetType,
  ): Promise<Required<OperationCost<Array<Entity>>>>;
}
