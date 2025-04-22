import { Entity } from "../entity";
import type { PropertyImpl } from "../property/property-base";
import type { BaseSchema, InferSchema } from "../schema";
import type { BaseCollection } from "./base-collection";
import type { CreateCollectionInterface } from "./types/create-collection-interface";

export class CreateCollection<
	Keys extends string,
	Schema extends Record<Keys, PropertyImpl>,
	EntityType extends InferSchema<BaseSchema<Keys, Schema>>,
> implements CreateCollectionInterface<EntityType>
{
	constructor(private repository: BaseCollection<Keys, Schema, EntityType>) {}

	async create(data: EntityType): Promise<string> {
		await this.repository.coconut.letMeKnowWhenAvailable();

		let itemId = this.repository.randomUUID();

		while (itemId in this.repository.items) {
			itemId = this.repository.randomUUID();
		}

		// TODO: Validar para ver se a entity está dando match com o Schema

		this.repository.items[itemId] = new Entity<EntityType>({
			id: itemId,
			value: data,
		});

		await this.repository.save();
		await this.repository.coconut.release();

		return itemId;
	}
}
