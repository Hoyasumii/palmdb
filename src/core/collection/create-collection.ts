import { Entity } from "../entity";
import type { PropertyBase } from "../property/property-base";
import type {
  BaseSchema,
  InferSchema,
} from "../schema";
import { getUniqueProperties } from "../schema/get-unique-properties";
import type { CollectionRepository } from "./collection-repository";
import type { CreateCollectionInterface } from "./types/create-collection-interface";

export class CreateCollection<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> implements CreateCollectionInterface<EntityType>
{
  constructor(
    private readonly repository: CollectionRepository<Keys, Schema, EntityType>
  ) {}

  private generateUUID(): string {
    let itemId = global.palm.randomUUID();

    while (itemId in this.repository.items) {
      itemId = global.palm.randomUUID();
    }

    return itemId;
  }

  // private findExistentProperty(): boolean {
  //   return true;
  // }

  async create(data: EntityType): Promise<string> {
    await global.palm.coconut.letMeKnowWhenAvailable();

    const itemId = this.generateUUID();

    if (!this.repository.validator.validate(data)) {
      await global.palm.coconut.release();
      throw new Error();
    }

    // getUniqueProperties(this.repository.schema)
    global.palm.cache.exists("");

    this.repository.items[itemId] = new Entity<EntityType>({
      id: itemId,
      value: data,
    });

    // TODO: Abstrair o palm.save
    // await global.palm.save();
    await global.palm.coconut.release();

    return itemId;
  }
}
