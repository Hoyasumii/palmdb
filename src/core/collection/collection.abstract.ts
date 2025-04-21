import type { BaseSchema } from "@/core/schema";
import type { PropertyImpl } from "@/core/property/property-impl";

export abstract class CollectionAbstract<
	Keys extends string,
	Schema extends Record<Keys, PropertyImpl>,
> {
	constructor(private schema: BaseSchema<Keys, Schema>) {}

  protected abstract toEntity(): void;
}
