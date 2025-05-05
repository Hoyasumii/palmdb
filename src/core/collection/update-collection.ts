import { PropertyBase } from "@/core/property/property-base";
import { BaseSchema, InferSchema } from "@/core/schema";
import { UpdateCollectionInterface } from "./types/update-collection-interface";
import { BaseEntity } from "@/core/entity/types";
import { OperationCost } from "@/global/types";
import { UpdateQueryable } from "@/global/types/queryable";
import { CollectionRepository } from "./collection-repository";
import {
  EntityExistsError,
  EntityNotMatchWithSchemaError,
  InvalidOperationError,
  ResourceNotFoundError,
} from "@/errors";
import { CollectionUniquenessChecker } from "./collection-uniquess-checker";
import { getUniqueProperties } from "../schema/get-unique-properties";

export class UpdateCollection<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> implements
    UpdateCollectionInterface<Keys, Schema, EntityType, BaseEntity<EntityType>>
{
  private uniquenessChecker: CollectionUniquenessChecker<
    Keys,
    Schema,
    EntityType
  >;

  constructor(
    private readonly repository: CollectionRepository<Keys, Schema, EntityType>
  ) {
    const uniqueProperties = getUniqueProperties(this.repository.schema);

    this.uniquenessChecker = new CollectionUniquenessChecker({
      uniqueProperties: uniqueProperties,
      collectionPath: this.repository.collectionName,
    });
  }

  async unique(
    query:
      | UpdateQueryable<
          EntityType,
          BaseEntity<EntityType>,
          "unique",
          "update-partial"
        >
      | UpdateQueryable<
          EntityType,
          BaseEntity<EntityType>,
          "unique",
          "update-function"
        >
  ): Promise<BaseEntity<EntityType>> {
    await global.palm.request.acquire();

    if (!(query.where in this.repository.store.hash)) {
      throw new ResourceNotFoundError();
    }

    if (typeof query.data !== "function" && typeof query.data !== "object")
      throw new InvalidOperationError();

    const targetEntity = this.repository.store.hash[query.where];
    const iterIndex = this.repository.store.iterIndexed[query.where];

    if (typeof query.data === "function") {
      if (
        !this.repository.validator.validate(
          query.data(query.data(targetEntity.value))
        )
      ) {
        throw new EntityNotMatchWithSchemaError();
      }

      // TODO: Adicionar um ignore no entityIsUnique
      if (!this.uniquenessChecker.entityIsUnique(query.data(targetEntity.value))) {
        throw new EntityExistsError();
      }

      this.repository.store.hash[query.where].update(
        query.data(targetEntity.value)
      );

      this.repository.store.iter[iterIndex] =
        this.repository.store.hash[query.where];

      this.repository.store.serializedHash[query.where] =
        this.repository.store.hash[query.where].value;

      global.palm.request.release();
      return targetEntity.value;
    }

    this.repository.store.hash[query.where].update({
      ...targetEntity.value,
      ...query.data,
    });

    this.repository.store.iter[iterIndex] =
      this.repository.store.hash[query.where];

    this.repository.store.serializedHash[query.where] =
      this.repository.store.hash[query.where].value;

    global.palm.request.release();
    return targetEntity.value;
  }

  async many(
    query:
      | UpdateQueryable<
          EntityType,
          BaseEntity<EntityType>,
          "many",
          "update-partial"
        >
      | UpdateQueryable<
          EntityType,
          BaseEntity<EntityType>,
          "many",
          "update-function"
        >
  ): Promise<Required<OperationCost<Array<BaseEntity<EntityType>>>>> {
    await global.palm.request.acquire();
    const initialTime = Date.now();

    const desiredItems: BaseEntity<EntityType>[] = [];

    if (typeof query.data !== "function" && typeof query.data !== "object")
      throw new InvalidOperationError();

    for (const entity of this.repository.store.iter) {
      if (query.where(entity.value)) {
        if (typeof query.data === "function") {
        }

        // entity.update()
      }
    }

    throw new Error("Method not implemented.");
  }
}
