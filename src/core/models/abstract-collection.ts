import type { CollectionInterface, EntityTypeInterface } from "@/core/types";
import type { Coconut, EntityType } from "@/core";
import type { ZodObject, ZodRawShape } from "zod";
import type { OperationCost } from "@/types";

export abstract class AbstractCollection<CollectionType extends object>
	implements CollectionInterface<CollectionType>
{
	constructor(
		protected items: Record<string, EntityType<CollectionType>>,
		protected coconut: Coconut,
		protected schema: ZodObject<ZodRawShape>,
		protected randomUUID: () => string,
		protected save: () => Promise<void>,
	) {}

	abstract create(data: CollectionType): Promise<string>;

	abstract update(
		where: string,
		data: Partial<CollectionType>,
	): Promise<EntityTypeInterface<CollectionType>>;
	abstract update(
		where: string,
		data: (target: CollectionType) => CollectionType,
	): Promise<EntityTypeInterface<CollectionType>>;
	abstract update(
		where: (id: string, target: CollectionType) => boolean,
		data: Partial<CollectionType>,
	): Promise<Required<OperationCost<EntityTypeInterface<CollectionType>[]>>>;
	abstract update(
		where: (id: string, target: CollectionType) => boolean,
		data: (target: CollectionType) => CollectionType,
	): Promise<Required<OperationCost<EntityTypeInterface<CollectionType>[]>>>;

	abstract read(where: string): Promise<EntityTypeInterface<CollectionType>>;
	abstract read(
		where: (target: CollectionType) => boolean,
	): Promise<
		Omit<OperationCost<EntityTypeInterface<CollectionType>[]>, "affectedItems">
	>;

	abstract delete(where: string): Promise<EntityTypeInterface<CollectionType>>;
	abstract delete(
		where: (target: CollectionType) => boolean,
	): Promise<OperationCost<EntityTypeInterface<CollectionType>[]>>;
}
