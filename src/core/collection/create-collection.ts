import type { PropertyImpl } from "../property/property-impl";
import type { BaseSchema, InferSchema } from "../schema";
import type { BaseCollection } from "./base-collection";
import type { CreateCollectionInterface } from "./types/create-collection-interface";

export class CreateCollection<
	Keys extends string,
	Schema extends Record<Keys, PropertyImpl>,
	EntityType extends InferSchema<BaseSchema<Keys, Schema>>,
> implements CreateCollectionInterface<EntityType> {
	constructor(private repository: BaseCollection<Keys, Schema, EntityType>) {}

  async create(data: EntityType): Promise<string> {
      
  }
}
