import { BaseSchema, InferSchema, SchemaValidator } from "@/core/schema";
import type { PropertyBase } from "@/core/property/property-base";
import { join } from "node:path";
import { CollectionRepositoryCannotBeExtendedError } from "@/errors";
import { Store } from "@/global/types";

type CollectionRepositoryConstructorProperties<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>
> = {
  schema: BaseSchema<Keys, Schema>;
  collectionName: string;
};

export class CollectionRepository<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> {
  public store: Store<Keys, Schema, EntityType> = {
    hash: {},
    serializedHash: {},
    iter: [],
  };
  public schema: BaseSchema<Keys, Schema>;
  public validator: SchemaValidator<Keys, Schema, EntityType>;
  public collectionName: string;
  public save: () => Promise<void>;

  constructor({
    schema,
    collectionName,
  }: CollectionRepositoryConstructorProperties<Keys, Schema>) {
    if (new.target !== CollectionRepository)
      throw new CollectionRepositoryCannotBeExtendedError();

    this.schema = schema;
    this.validator = new SchemaValidator(this.schema);
    this.collectionName = collectionName;

    const collectionPath = join(
      global.palm.info.dbFolderPath,
      `${collectionName}.json`
    );

    // TODO: Criar um Store Builder e associar a this.store
    // TODO: Verificar se o arquivo existe, senão, crie-o
    // TODO: Caso o arquivo exista: Deserialize -> valide-o
    // TODO: Atribua a items

    this.save = async () => {
      await global.palm.save(
        collectionPath,
        JSON.stringify(this.store.serializedHash, null, 2)
      );
    };
  }
}
