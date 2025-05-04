import { PropertyBase } from "@/core/property/property-base";
import { BaseSchema, InferSchema } from "@/core/schema";
import { UpdateCollectionInterface } from "./types/update-collection-interface";
import { BaseEntity } from "@/core/entity/types";
import { OperationCost } from "@/global/types";
import { UpdateQueryable } from "@/global/types/queryable";

export class UpdateCollection<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> implements
    UpdateCollectionInterface<Keys, Schema, EntityType, BaseEntity<EntityType>>
{
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
    throw new Error("Method not implemented.");
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
    throw new Error("Method not implemented.");
  }
}
