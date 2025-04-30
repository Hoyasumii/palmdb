import { BaseEntity } from "@/core/entity/types";

interface PreQueryable<
  TargetType extends object,
  Entity extends BaseEntity<TargetType>
> {
  where: (target: Entity) => boolean;
  limit?: number;
  page?: number;
}

export type Queryable<
  TargetType extends object,
  Entity extends BaseEntity<TargetType>,
  IsUpdatable extends boolean,
  UpdatablePartial extends boolean
> = PreQueryable<TargetType, Entity> &
  (IsUpdatable extends true
    ? {
        data: UpdatablePartial extends true
          ? Partial<TargetType>
          : (target: TargetType) => TargetType;
      }
    : {});
