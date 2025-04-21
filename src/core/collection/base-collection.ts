import type { BaseSchema, InferSchema } from "@/core/schema";
import type { PropertyImpl } from "@/core/property/property-impl";
import type { BaseEntity } from "@/core/entity/types";
import type { Coconut } from "@/core";

export class BaseCollection<
	Keys extends string,
	Schema extends Record<Keys, PropertyImpl>,
	EntityType extends InferSchema<BaseSchema<Keys, Schema>>,
> {
	constructor(
		protected items: Record<string, BaseEntity<EntityType>>,
		protected coconut: Coconut,
		protected schema: EntityType,
		protected randomUUID: () => string,
		protected save: () => Promise<void>,
	) {
		if (new.target !== BaseCollection) throw new Error();
	}
}
