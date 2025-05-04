import { BaseEntity } from "@/core/entity/types";
import { BaseQueryable, FilterModes } from "./base-queryable";

export interface FindQueryable<
  TargetType extends object,
  Entity extends BaseEntity<TargetType>,
  FilterMode extends FilterModes
> extends BaseQueryable<TargetType, Entity, FilterMode> {
  limit?: number;
  page?: number;
}
