import type { PropertyImpl } from "@/core/property/property-impl";

export class BaseSchema<
  Keys extends string,
  Schema extends Record<Keys, PropertyImpl>,
> {
  constructor(public value: Schema) {}
}