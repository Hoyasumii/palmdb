import { Entity } from "../entity";
import type { PropertyBase } from "../property/property-base";
import type { BaseSchema, InferSchema } from "../schema";
import type { CollectionRepository } from "./collection-repository";
import type { CreateCollectionInterface } from "./types/create-collection-interface";

export class CreateCollection<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> implements CreateCollectionInterface<EntityType>
{
  constructor(private readonly repository: CollectionRepository<Keys, Schema, EntityType>) {}

  async create(data: EntityType): Promise<string> {
    await this.repository.coconut.letMeKnowWhenAvailable();

    let itemId = this.repository.randomUUID();

    while (itemId in this.repository.items) {
      itemId = this.repository.randomUUID();
    }

    if (!this.repository.validator.validate(data)) {
      await this.repository.coconut.release();
      throw new Error();
    }

		// TODO: Verificar se existe alguma propriedade única que já teve registo no Database -> O(n*m)

    this.repository.items[itemId] = new Entity<EntityType>({
      id: itemId,
      value: data,
    });

    await this.repository.save();
    await this.repository.coconut.release();

    return itemId;
  }
}
