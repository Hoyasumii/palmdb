import type { BaseEntity } from "@/core/entity/types";
import type { CreateCollectionInterface } from "./create-collection-interface";
import type { FindCollectionInterface } from "./find-collection-interface";
import type { UpdateCollectionInterface } from "./update-collection-interface";
import type { DeleteCollectionInterface } from "./delete-collection-interface";

export interface BaseCollection<
	TargetType extends object,
	Entity extends BaseEntity<TargetType>,
> {
	length: number;

	create: CreateCollectionInterface<TargetType>;

	find: FindCollectionInterface<TargetType, Entity>;

	update: UpdateCollectionInterface<TargetType, Entity>;

	delete: DeleteCollectionInterface<TargetType, Entity>;
}
