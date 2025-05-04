import { BaseEntity } from "@/core/entity/types";
import { BaseQueryable, FilterModes } from "./base-queryable";

export type UpdateMethods = "update-partial" | "update-function";

export interface UpdateQueryable<
  TargetType extends object,
  Entity extends BaseEntity<TargetType>,
  FilterMode extends FilterModes,
  UpdateMode extends UpdateMethods
> extends BaseQueryable<TargetType, Entity, FilterMode> {
  data: UpdateMode extends "update-partial"
    ? Partial<TargetType>
    : UpdateMode extends "update-function"
    ? (target: TargetType) => TargetType
    : never;
}
