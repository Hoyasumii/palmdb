import type { PropertyBase } from "@/core/property/property-base";

export class BaseSchema<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>
> {
  constructor(public value: Schema) {}
}
