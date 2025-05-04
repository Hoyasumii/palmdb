import { BaseEntity } from "@/core/entity/types";

export type FilterModes = "unique" | "many";

export interface BaseQueryable<
  TargetType extends object,
  Entity extends BaseEntity<TargetType>,
  FilterMode extends FilterModes
> {
  where: FilterMode extends "unique"
    ? string
    : FilterMode extends "many"
    ? (target: Entity) => boolean
    : never;
}
