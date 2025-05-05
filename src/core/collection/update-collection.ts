import { PropertyBase } from "@/core/property/property-base";
import { BaseSchema, InferSchema } from "@/core/schema";
import { UpdateCollectionInterface } from "./types/update-collection-interface";
import { BaseEntity } from "@/core/entity/types";
import { OperationCost } from "@/global/types";
import { UpdateQueryable } from "@/global/types/queryable";
import { CollectionRepository } from "./collection-repository";
import { InvalidOperationError, ResourceNotFoundError } from "@/errors";

export class UpdateCollection<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> implements
    UpdateCollectionInterface<Keys, Schema, EntityType, BaseEntity<EntityType>>
{
  constructor(
    private readonly repository: CollectionRepository<Keys, Schema, EntityType>
  ) {}

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

    if (typeof query.data === "function") {
      this.repository.store.hash[query.where].update(
        query.data(targetEntity.value)
      );
      // TODO: Atualizar o iter o serializedHash

      global.palm.request.release();
      return targetEntity.value;
    }

    this.repository.store.hash[query.where].update({
      ...targetEntity.value,
      ...query.data,
    });

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
