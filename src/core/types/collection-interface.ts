import type { OperationCost } from "@/types";
import type { EntityTypeInterface } from "./entity-type-interface";

export interface CollectionInterface<CollectionType extends object> {
	create(data: CollectionType): Promise<string>;

	update(
		where: string,
		data: Partial<CollectionType>,
	): Promise<EntityTypeInterface<CollectionType>>;
	update(
		where: string,
		data: (target: CollectionType) => CollectionType,
	): Promise<EntityTypeInterface<CollectionType>>;
	update(
		where: (id: string, target: CollectionType) => boolean,
		data: Partial<CollectionType>,
	): Promise<
		Required<OperationCost<Array<EntityTypeInterface<CollectionType>>>>
	>;
	update(
		where: (id: string, target: CollectionType) => boolean,
		data: (target: CollectionType) => CollectionType,
	): Promise<
		Required<OperationCost<Array<EntityTypeInterface<CollectionType>>>>
	>;

	read(where: string): Promise<EntityTypeInterface<CollectionType>>;
	read(
		where: (target: CollectionType) => boolean,
	): Promise<
		Omit<
			OperationCost<Array<EntityTypeInterface<CollectionType>>>,
			"affectedItems"
		>
	>;

	delete(where: string): Promise<EntityTypeInterface<CollectionType>>;
	delete(
		where: (target: CollectionType) => boolean,
	): Promise<OperationCost<Array<EntityTypeInterface<CollectionType>>>>;
}
