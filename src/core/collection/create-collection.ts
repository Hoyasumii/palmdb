import { randomUUID } from "node:crypto";
import { Coconut } from "../coconut";
import { Entity } from "../entity";
import { string } from "../property";
import type { PropertyBase } from "../property/property-base";
import {
  schema,
  SchemaValidator,
  type BaseSchema,
  type InferSchema,
} from "../schema";
import { getUniqueProperties } from "../schema/get-unique-properties";
import { CollectionRepository } from "./collection-repository";
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

  private checkEntityExistenceByUniqueProperty(data: EntityType): boolean {
    const targetEntityUniqueProperties = getUniqueProperties(
      this.repository.schema
    );

    for (const property of targetEntityUniqueProperties) {
      const targetProperty = data[
        property as keyof EntityType
      ] as unknown as EntityType[Keys];

      if (
        JSON.stringify(targetProperty) in
        this.repository.cache[property as Keys]
      )
        return true;
    }

    return false;
  }

  private registerUniquePropertiesAtCache() {}

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

    if (this.checkEntityExistenceByUniqueProperty(data)) throw new Error();
    // this.repository.cache[]

    this.repository.cache

    this.repository.items[itemId] = new Entity<EntityType>({
      id: itemId,
      value: data,
    });

    await this.repository.save();
    await this.repository.coconut.release();

    return itemId;
  }
}

const accountSchema = schema({
  name: string({ unique: true }),
});

const repo = new CollectionRepository(
  {},
  {
    name: {},
  },
  accountSchema,
  new SchemaValidator(accountSchema),
  () => randomUUID(),
  async () => {}
);

const service = new CreateCollection(repo);

console.log(
  await service.create({
    name: "Alan",
  })
);
