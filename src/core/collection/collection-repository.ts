import { BaseSchema, InferSchema, SchemaValidator } from "@/core/schema";
import type { PropertyBase } from "@/core/property/property-base";
import { CollectionRepositoryCannotBeExtendedError } from "@/errors";
import { Store } from "@/global/types";
import { join } from "@/global/utils";

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
    iterIndexed: {},
    count: 0,
  };
  public schema: BaseSchema<Keys, Schema>;
  public validator: SchemaValidator<Keys, Schema, EntityType>;
  public collectionName: string;
  public save: (id: string, value: Buffer) => Promise<void>;

  constructor({
    schema,
    collectionName,
  }: CollectionRepositoryConstructorProperties<Keys, Schema>) {
    if (new.target !== CollectionRepository)
      throw new CollectionRepositoryCannotBeExtendedError();

    this.schema = schema;
    this.validator = new SchemaValidator(this.schema);
    this.collectionName = collectionName;

    // TODO: Verificar se o arquivo existe, senão, crie-o
    // TODO: Atribua a items

    this.save = async (id, value) => {
      const collectionPath = join(
        global.palm.info.dbFolderPath,
        `${collectionName}/${id}.msgpack`
      );

      console.log(await global.palm.save(collectionPath, value));
      // await writeFile(collectionPath, value);
    };
  }
}
