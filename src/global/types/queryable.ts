import { BaseEntity } from "@/core/entity/types";

export interface Queryable<
  TargetType extends object,
  Entity extends BaseEntity<TargetType>,
  IsUpdatable extends boolean,
  UpdatablePartial extends boolean
> {
  where: (target: Entity) => boolean;
  limit: number;
  skip: number;
  data: IsUpdatable extends true
    ? UpdatablePartial extends true
      ? Partial<TargetType>
      : (target: TargetType) => TargetType
    : never;
}
