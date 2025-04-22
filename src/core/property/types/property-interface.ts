import type { PropertyBase } from "../property-base";
import type { PropertyTypes } from "./property-types";

export interface PropertyInterface<
  PropertyType extends keyof PropertyTypes = keyof PropertyTypes,
  IsNullable extends boolean = boolean
> extends PropertyBase<PropertyType, IsNullable> {
  readonly type: PropertyType;
  readonly nullable: IsNullable;
  readonly unique: boolean;
}
