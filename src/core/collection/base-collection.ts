import type { BaseSchema, InferSchema } from "@/core/schema";
import type { PropertyImpl } from "@/core/property/property-impl";
import type { Coconut, Entity } from "@/core";

export class BaseCollection<
	Keys extends string,
	Schema extends Record<Keys, PropertyImpl>,
	EntityType extends InferSchema<BaseSchema<Keys, Schema>>,
> {
	constructor(
		public items: Record<string, Entity<EntityType>>,
		public coconut: Coconut,
		public schema: EntityType,
		public randomUUID: () => string,
		public save: () => Promise<void>,
	) {
		if (new.target !== BaseCollection) throw new Error();
	}
}
