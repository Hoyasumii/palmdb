import type { BaseSchema, InferSchema, SchemaValidator } from "@/core/schema";
import type { PropertyBase } from "@/core/property/property-base";
import type { Entity } from "@/core";
import { join } from "node:path";

type CollectionRepositoryConstructorProperties<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> = {
  items: Record<string, Entity<EntityType>>;
  schema: BaseSchema<Keys, Schema>;
  validator: SchemaValidator<Keys, Schema, EntityType>;
  collectionName: string;
};

export class CollectionRepository<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> {
  public items: Record<string, Entity<EntityType>>;
  public schema: BaseSchema<Keys, Schema>;
  public validator: SchemaValidator<Keys, Schema, EntityType>;
  public collectionName: string;
  public save: () => Promise<void>;

  constructor({
    items,
    schema,
    validator,
    collectionName,
  }: CollectionRepositoryConstructorProperties<Keys, Schema, EntityType>) {
    if (new.target !== CollectionRepository) throw new Error();

    this.items = items;
    this.schema = schema;
    this.validator = validator;
    this.collectionName = collectionName;

    const collectionPath = join(
      global.palm.info.dbFolderPath,
      `${collectionName}.json`
    );

    // TODO: Verificar se o arquivo existe, senão, crie-o
    // TODO: Caso o arquivo exista: Deserialize -> valide-o
    // TODO: Atribua a items

    this.save = async () => {
      await global.palm.save(
        collectionPath,
        JSON.stringify(this.items, null, 2)
      );
    };
  }
}
