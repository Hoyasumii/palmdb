import type { CollectionInterface } from "@/core/types";
import type { Coconut } from "./coconut";
import { randomUUID } from "node:crypto";
import type { ZodObject, ZodRawShape } from "zod";
import type { OperationCost } from "@/types";

export class Collection<CollectionType>
	implements CollectionInterface<CollectionType>
{
	constructor(
		public items: Record<string, CollectionType>,
		public coconut: Coconut,
		public schema: ZodObject<ZodRawShape>,
		public save: () => Promise<void>,
	) {}

	async create(data: CollectionType) {
		await this.coconut.letMeKnowWhenAvailable();

		let itemId = randomUUID().toString();

		while (itemId in this.items) {
			itemId = randomUUID.toString();
		}

		const parsedData = this.schema.safeParse(data);

		if (!parsedData.success) throw new Error();

		this.items[itemId] = parsedData.data as CollectionType;

		await this.save();
		await this.coconut.release();

		return itemId;
	}

	update(where: string, data: Partial<CollectionType>): Promise<CollectionType>;
	update(
		where: string,
		data: (target: CollectionType) => CollectionType,
	): Promise<CollectionType>;
	update(
		where: (id: string, target: CollectionType) => boolean,
		data: Partial<CollectionType>,
	): Promise<Required<OperationCost<Array<CollectionType>>>>;
	update(
		where: (id: string, target: CollectionType) => boolean,
		data: (target: CollectionType) => CollectionType,
	): Promise<Required<OperationCost<Array<CollectionType>>>>;
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

			const newItem = transform(this.items[where]);

			const { success, data: parsedData } = this.schema.safeParse(newItem);

			if (!success) throw new Error();

			this.items[where] = parsedData as CollectionType;

			await this.save();
			await this.coconut.release();

			return parsedData as CollectionType;
		}

		if (typeof where === "function") {
			const target = Object.entries(this.items).filter(([id, value]) =>
				where(id, value),
			);

			const updatedItems = target.map(([id, value]) => {
				const newItem = transform(value);

				const { success, data: parsedData } = this.schema.safeParse(newItem);

				if (!success) throw new Error();

				this.items[id] = parsedData as CollectionType;

				return parsedData as CollectionType;
			});

			await this.save();
			await this.coconut.release();

			return {
				affectedItems: updatedItems.length,
				timing: Date.now() - initialTime,
				data: updatedItems,
			} as OperationCost<Array<CollectionType>>;
		}

		await this.coconut.release();
		throw new Error();
	}

	read(where: string): Promise<CollectionType>;
	read(
		where: (target: CollectionType) => boolean,
	): Promise<Omit<OperationCost<Array<CollectionType>>, "affectedItems">>;
	async read(where: string | ((target: CollectionType) => boolean)) {
		await this.coconut.letMeKnowWhenAvailable();
		const initialTime = Date.now();

		if (typeof where === "string") {
			await this.coconut.release();

			if (!(where in this.items)) throw new Error();

			return this.items[where];
		}

		if (typeof where === "function") {
			const target = Object.entries(this.items)
				.filter(([_, value]) => where(value))
				.map(([_, value]) => value);

			return {
				timing: Date.now() - initialTime,
				data: target,
			};
		}

		await this.coconut.release();
		throw new Error();
	}

	delete(where: string): Promise<CollectionType>;
	delete(
		where: (target: CollectionType) => boolean,
	): Promise<OperationCost<CollectionType>>;
	async delete(where: string | ((target: CollectionType) => boolean)) {
		await this.coconut.letMeKnowWhenAvailable();
		const initialTime = Date.now();

		if (typeof where === "string") {
			if (!(where in this.items)) throw new Error();

			const target = this.items[where];
			delete this.items[where];

			await this.save();
			await this.coconut.release();
			return target;
		}

		if (typeof where === "function") {
			const target = Object.entries(this.items).filter(([_, value]) =>
				where(value),
			);

			for (const [key] of target) {
				delete this.items[key];
			}

			await this.save();
			await this.coconut.release();
			return {
				affectedItems: target.length,
				timing: Date.now() - initialTime,
				data: target,
			} as OperationCost<CollectionType>;
		}

		await this.coconut.release();
		throw new Error();
	}
}

// O Palm vai receber um PalmConfig e um PalmProvider, que pode ser Node ou Bun.
// TODO: Adicionar em cada objeto, uma propriedade de _id, _createdAt e _updatedAt
