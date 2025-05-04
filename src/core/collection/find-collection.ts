import { BaseEntity } from "@/core/entity/types";
import { FindCollectionInterface } from "./types/find-collection-interface";
import { Queryable, OperationCost } from "@/global/types";
import { CollectionRepository } from "./collection-repository";
import { PropertyBase } from "../property/property-base";
import { BaseSchema, InferSchema } from "../schema";
import {
  LimitMustBeGreatherThanZeroError,
  PageMustBeGreatherThanZeroError,
  ResourceNotFoundError,
} from "@/errors";

export class FindCollection<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> implements
    FindCollectionInterface<Keys, Schema, EntityType, BaseEntity<EntityType>>
{
  constructor(
    private readonly repository: CollectionRepository<Keys, Schema, EntityType>
  ) {}

  async unique(id: string): Promise<BaseEntity<EntityType>> {
    await global.palm.request.acquire();

    if (!(id in this.repository.store.hash)) {
      throw new ResourceNotFoundError();
    }

    global.palm.request.release();
    return this.repository.store.hash[id].value;
  }

  async many(
    query: Queryable<EntityType, BaseEntity<EntityType>, false, false>
  ) {
    await global.palm.request.acquire();
    const initialTime = Date.now();

    query.page = !query.page ? 0 : query.page;

    const { where, limit, page } = query;

    if (page && page <= 0) throw new PageMustBeGreatherThanZeroError();
    if (limit && limit <= 0) throw new LimitMustBeGreatherThanZeroError();

    let count = 0;
    const desiredItems: BaseEntity<EntityType>[] = [];

    for (const entity of this.repository.store.iter) {
      if (where(entity.value)) {
        desiredItems.push(entity.value);
        count++;
      }

      if (limit && page && count === limit * (page + 1)) break;
    }

    global.palm.request.release();

    if (
      limit !== undefined &&
      page !== undefined &&
      parseInt(`${limit}`) >= 0 &&
      parseInt(`${page}`) >= 0
    ) {
      return {
        timing: Date.now() - initialTime,
        data: desiredItems.slice(page * limit, limit * (page + 1)),
      };
    }

    return {
      timing: Date.now() - initialTime,
      data: desiredItems,
    };
  }

  async countMany(
    query: Pick<
      Queryable<EntityType, BaseEntity<EntityType>, false, false>,
      "where"
    >
  ): Promise<Omit<OperationCost<number>, "affectedItems">> {
    await global.palm.request.acquire();
    const initialTime = Date.now();

    let count = 0;

    for (const entity of this.repository.store.iter) {
      if (query.where(entity.value)) {
        count++;
      }
    }

    global.palm.request.release();

    return {
      data: count,
      timing: Date.now() - initialTime,
    };
  }
}
