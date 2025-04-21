import type { BaseEntity } from "@/core/entity/types";
import type { OperationCost } from "@/global/types";

export interface FindCollectionInterface<
	TargetType extends object,
	Entity extends BaseEntity<TargetType>,
> {
	unique(id: string): Promise<Entity>;
	many(
		where: (target: Entity) => boolean,
	): Promise<Omit<OperationCost<Array<Entity>>, "affectedItems">>;
}
