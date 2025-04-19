import type { EntityInterface } from "@/core/types";
import { Entity } from "./entity";
import type { OperationCost } from "@/types";
import { AbstractCollection } from "@/core/models";

export class Collection<
	BaseEntity extends object,
> extends AbstractCollection<BaseEntity> {
	async create(data: BaseEntity) {
		await this.coconut.letMeKnowWhenAvailable();

		let itemId = this.randomUUID().toString();

		while (itemId in this.items) {
			itemId = this.randomUUID().toString();
		}

		const parsedData = this.schema.safeParse(data);

		if (!parsedData.success) throw new Error();

		this.items[itemId] = new Entity<BaseEntity>(
			parsedData.data as BaseEntity,
			itemId,
		);

		await this.save();
		await this.coconut.release();

		return itemId;
	}

	updateUnique(
		id: string,
		data: Partial<BaseEntity>,
	): Promise<EntityInterface<BaseEntity>>;
	updateUnique(
		id: string,
		data: (target: BaseEntity) => BaseEntity,
	): Promise<EntityInterface<BaseEntity>>;
	async updateUnique(
		id: string,
		data: Partial<BaseEntity> | ((target: BaseEntity) => BaseEntity),
	) {
		await this.coconut.letMeKnowWhenAvailable();

		if (!(id in this.items)) throw new Error();

		const newItem: BaseEntity = this.updateEntity(
			this.items[id].baseValue,
			data,
		);

		const { success, data: parsedData } = this.schema.safeParse(
			newItem,
		) as unknown as { success: boolean; data: BaseEntity };

		if (!success) throw new Error();

		this.items[id].update(parsedData);

		await this.save();
		await this.coconut.release();

		return this.items[id].value;
	}

	updateMany(
		where: (target: EntityInterface<BaseEntity>) => boolean,
		data: Partial<BaseEntity>,
	): Promise<Required<OperationCost<Array<EntityInterface<BaseEntity>>>>>;
	updateMany(
		where: (target: EntityInterface<BaseEntity>) => boolean,
		data: (target: BaseEntity) => BaseEntity,
	): Promise<Required<OperationCost<Array<EntityInterface<BaseEntity>>>>>;
	async updateMany(
		where: (target: EntityInterface<BaseEntity>) => boolean,
		data: Partial<BaseEntity> | ((target: BaseEntity) => BaseEntity),
	) {
		await this.coconut.letMeKnowWhenAvailable();
		const initialTime = Date.now();

		const targetEntities = Object.values(this.items).filter((entity) =>
			where(entity.value),
		);

		const updatedEntities = targetEntities.map((entity) => {
			const newItem = this.updateEntity(entity.baseValue, data);

			const { success, data: parsedData } = this.schema.safeParse(newItem) as {
				success: boolean;
				data: BaseEntity;
			};

			if (!success) throw new Error();

			entity.update(parsedData);

			return entity.value;
		});

		await this.save();
		await this.coconut.release();

		return {
			affectedItems: updatedEntities.length,
			timing: Date.now() - initialTime,
			data: updatedEntities,
		};
	}

	// read(where: string): Promise<EntityTypeInterface<CollectionType>>;
	// read(
	// 	where: (target: CollectionType) => boolean,
	// ): Promise<
	// 	Omit<
	// 		OperationCost<Array<EntityTypeInterface<CollectionType>>>,
	// 		"affectedItems"
	// 	>
	// >;

	// async read(where: string | ((target: CollectionType) => boolean)) {
	// 	await this.coconut.letMeKnowWhenAvailable();
	// 	const initialTime = Date.now();

	// 	if (typeof where === "string") {
	// 		await this.coconut.release();

	// 		if (!(where in this.items)) throw new Error();

	// 		return this.items[where].value;
	// 	}

	// 	if (typeof where === "function") {
	// 		const target = Object.entries(this.items)
	// 			.filter(([_, value]) => where(value.baseValue))
	// 			.map(([_, value]) => value.value);

	// 		return {
	// 			timing: Date.now() - initialTime,
	// 			data: target,
	// 		};
	// 	}

	// 	await this.coconut.release();
	// 	throw new Error();
	// }

	// delete(where: string): Promise<EntityTypeInterface<CollectionType>>;
	// delete(
	// 	where: (target: CollectionType) => boolean,
	// ): Promise<OperationCost<Array<EntityTypeInterface<CollectionType>>>>;
	// async delete(where: string | ((target: CollectionType) => boolean)) {
	// 	await this.coconut.letMeKnowWhenAvailable();
	// 	const initialTime = Date.now();

	// 	if (typeof where === "string") {
	// 		if (!(where in this.items)) throw new Error();

	// 		const target = this.items[where];
	// 		delete this.items[where];

	// 		await this.save();
	// 		await this.coconut.release();
	// 		return target.value;
	// 	}

	// 	if (typeof where === "function") {
	// 		const target = Object.entries(this.items).filter(([_, value]) =>
	// 			where(value.baseValue),
	// 		);

	// 		for (const [key] of target) {
	// 			delete this.items[key];
	// 		}

	// 		await this.save();
	// 		await this.coconut.release();
	// 		return {
	// 			affectedItems: target.length,
	// 			timing: Date.now() - initialTime,
	// 			data: target.map(([_, content]) => content.value),
	// 		} as OperationCost<Array<EntityTypeInterface<CollectionType>>>;
	// 	}

	// 	await this.coconut.release();
	// 	throw new Error();
	// }
}
