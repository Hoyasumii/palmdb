import type { EntityTypeInterface } from "@/core/types";
import { EntityType } from "./entity-type";
import type { OperationCost } from "@/types";
import { AbstractCollection } from "@/core/models";

export class Collection<
	CollectionType extends object,
> extends AbstractCollection<CollectionType> {
	async create(data: CollectionType) {
		await this.coconut.letMeKnowWhenAvailable();

		let itemId = this.randomUUID().toString();

		while (itemId in this.items) {
			itemId = this.randomUUID().toString();
		}

		const parsedData = this.schema.safeParse(data);

		if (!parsedData.success) throw new Error();

		this.items[itemId] = new EntityType(
			parsedData.data as CollectionType,
			itemId,
		);

		await this.save();
		await this.coconut.release();

		return itemId;
	}

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
	async update(
		where: string | ((id: string, target: CollectionType) => boolean),
		data:
			| Partial<CollectionType>
			| ((target: CollectionType) => CollectionType),
	) {
		await this.coconut.letMeKnowWhenAvailable();
		const initialTime = Date.now();

		const transformGuide = {
			object: (value: CollectionType): CollectionType => ({
				...value,
				...data,
			}),
			function: (value: CollectionType): CollectionType =>
				(data as CallableFunction)(value),
		};

		if (!((typeof data) in transformGuide)) throw new Error();

		const transform =
			transformGuide[typeof data as keyof typeof transformGuide];

		if (typeof where === "string") {
			if (!(where in this.items)) throw new Error();

			const newItem = transform(this.items[where].baseValue);

			const { success, data: parsedData } = this.schema.safeParse(newItem);

			if (!success) throw new Error();

			this.items[where].update = parsedData as CollectionType;

			await this.save();
			await this.coconut.release();

			return this.items[where].value;
		}

		if (typeof where === "function") {
			const target = Object.entries(this.items).filter(([id, value]) =>
				where(id, value.baseValue),
			);

			const updatedItems = target.map(([id, value]) => {
				const newItem = transform(value.baseValue);

				const { success, data: parsedData } = this.schema.safeParse(newItem);

				if (!success) throw new Error();

				this.items[id].update = parsedData as CollectionType;

				return this.items[id].value as EntityTypeInterface<CollectionType>;
			});

			await this.save();
			await this.coconut.release();

			return {
				affectedItems: updatedItems.length as number,
				timing: Date.now() - initialTime,
				data: updatedItems,
			};
		}

		await this.coconut.release();
		throw new Error();
	}

	read(where: string): Promise<EntityTypeInterface<CollectionType>>;
	read(
		where: (target: CollectionType) => boolean,
	): Promise<
		Omit<
			OperationCost<Array<EntityTypeInterface<CollectionType>>>,
			"affectedItems"
		>
	>;
	async read(where: string | ((target: CollectionType) => boolean)) {
		await this.coconut.letMeKnowWhenAvailable();
		const initialTime = Date.now();

		if (typeof where === "string") {
			await this.coconut.release();

			if (!(where in this.items)) throw new Error();

			return this.items[where].value;
		}

		if (typeof where === "function") {
			const target = Object.entries(this.items)
				.filter(([_, value]) => where(value.baseValue))
				.map(([_, value]) => value.value);

			return {
				timing: Date.now() - initialTime,
				data: target,
			};
		}

		await this.coconut.release();
		throw new Error();
	}

	delete(where: string): Promise<EntityTypeInterface<CollectionType>>;
	delete(
		where: (target: CollectionType) => boolean,
	): Promise<OperationCost<Array<EntityTypeInterface<CollectionType>>>>;
	async delete(where: string | ((target: CollectionType) => boolean)) {
		await this.coconut.letMeKnowWhenAvailable();
		const initialTime = Date.now();

		if (typeof where === "string") {
			if (!(where in this.items)) throw new Error();

			const target = this.items[where];
			delete this.items[where];

			await this.save();
			await this.coconut.release();
			return target.value;
		}

		if (typeof where === "function") {
			const target = Object.entries(this.items).filter(([_, value]) =>
				where(value.baseValue),
			);

			for (const [key] of target) {
				delete this.items[key];
			}

			await this.save();
			await this.coconut.release();
			return {
				affectedItems: target.length,
				timing: Date.now() - initialTime,
				data: target.map(([_, content]) => content.value),
			} as OperationCost<Array<EntityTypeInterface<CollectionType>>>;
		}

		await this.coconut.release();
		throw new Error();
	}
}
