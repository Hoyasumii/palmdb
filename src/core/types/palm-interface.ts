import type { z, ZodObject, ZodRawShape } from "zod";
import type { CollectionInterface } from "./collection-interface";
import type { FSInterface } from "@/core/providers/types";
import type { EntityInterface } from "./entity-interface";

export interface PalmInterface<
	Keys extends string,
	Values extends Record<Keys, ZodObject<ZodRawShape>>,
> {
	fs: FSInterface;

	dbManager?: {
		export: null;
		import: null;
		getCollections: null;
	};

	start(): Promise<void>;

	pick<BaseEntity extends never>(
		target: Keys,
	): Promise<CollectionInterface<BaseEntity, EntityInterface<BaseEntity>>>;
}
