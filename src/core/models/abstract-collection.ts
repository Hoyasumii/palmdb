import type { CollectionInterface, EntityInterface } from "@/core/types";
import type { Coconut } from "@/core";
import type { ZodObject, ZodRawShape } from "zod";
import type { OperationCost } from "@/types";
import type { Entity } from "@/core";

export abstract class AbstractCollection<BaseEntity extends object>
	implements CollectionInterface<BaseEntity, EntityInterface<BaseEntity>>
{
	constructor(
		protected items: Record<string, Entity<BaseEntity>>,
		protected coconut: Coconut,
		protected schema: ZodObject<ZodRawShape>,
		protected randomUUID: () => string,
		protected save: () => Promise<void>,
	) {}

	abstract create(data: BaseEntity): Promise<string>;

	protected updateEntity(
		baseValue: BaseEntity,
		updateTo: Partial<BaseEntity> | ((target: BaseEntity) => BaseEntity),
	): BaseEntity {
		let newItem: BaseEntity;

		if (typeof updateTo === "function") {
			newItem = updateTo(baseValue);
		} else if (typeof updateTo === "object") {
			newItem = {
				...baseValue,
				...updateTo,
			};
		} else {
			throw new Error();
		}

		return newItem;
	}

	abstract updateUnique(
		id: string,
		data: Partial<BaseEntity>,
	): Promise<EntityInterface<BaseEntity>>;
	abstract updateUnique(
		id: string,
		data: (target: BaseEntity) => BaseEntity,
	): Promise<EntityInterface<BaseEntity>>;

	abstract updateMany(
		where: (target: EntityInterface<BaseEntity>) => boolean,
		data: Partial<BaseEntity>,
	): Promise<Required<OperationCost<Array<EntityInterface<BaseEntity>>>>>;
	abstract updateMany(
		where: (target: EntityInterface<BaseEntity>) => boolean,
		data: (target: BaseEntity) => BaseEntity,
	): Promise<Required<OperationCost<Array<EntityInterface<BaseEntity>>>>>;

	abstract findUnique(id: string): Promise<EntityInterface<BaseEntity>>;

	abstract findMany(
		where: (target: EntityInterface<BaseEntity>) => boolean,
	): Promise<
		Omit<OperationCost<Array<EntityInterface<BaseEntity>>>, "affectedItems">
	>;

	abstract deleteUnique(id: string): Promise<EntityInterface<BaseEntity>>;

	abstract deleteMany(
		where: (target: EntityInterface<BaseEntity>) => boolean,
	): Promise<OperationCost<Array<EntityInterface<BaseEntity>>>>;

	async length() {
		await this.coconut.letMeKnowWhenAvailable();

		return Object.values(this.items).length;
	}
}
