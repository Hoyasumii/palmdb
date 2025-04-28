import { Entity } from "@/core/entity";
import type { PropertyBase } from "@/core/property/property-base";
import type { BaseSchema, InferSchema } from "@/core/schema";
import { getUniqueProperties } from "@/core/schema/get-unique-properties";
import type { CollectionRepository } from "./collection-repository";
import { CollectionUniquenessChecker } from "./collection-uniquess-checker";
import type { CreateCollectionInterface } from "./types/create-collection-interface";
import { EntityExistsError, EntityNotMatchWithSchemaError } from "@/errors";
import { collectionCacheSetter } from "./collection-cache-setter";

export class CreateCollection<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> implements CreateCollectionInterface<EntityType>
{
  private uniquenessChecker: CollectionUniquenessChecker<
    Keys,
    Schema,
    EntityType
  >;
  private uniqueProperties: Array<string>;

  constructor(
    private readonly repository: CollectionRepository<Keys, Schema, EntityType>
  ) {
    this.uniqueProperties = getUniqueProperties(this.repository.schema);

    this.uniquenessChecker = new CollectionUniquenessChecker({
      uniqueProperties: this.uniqueProperties,
      collectionPath: this.repository.collectionName,
    });
  }

  private generateUUID(): string {
    let itemId = global.palm.randomUUID();

    while (itemId in this.repository.items) {
      itemId = global.palm.randomUUID();
    }

    return itemId;
  }

  async create(data: EntityType): Promise<string> {

    const itemId = this.generateUUID();

    if (!this.repository.validator.validate(data)) {
      throw new EntityNotMatchWithSchemaError();
    }

    if (!this.uniquenessChecker.entityIsUnique(data)) {
      throw new EntityExistsError();
    }

    this.repository.items[itemId] = new Entity<EntityType>({
      id: itemId,
      value: data,
    });

    collectionCacheSetter({
      collection: this.repository.collectionName,
      uniqueProperties: this.uniqueProperties,
      value: data as Record<string, string>
    })

    await this.repository.save();
    global.palm.coconut.release();

    return itemId;
  }
}
