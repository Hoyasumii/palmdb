import { PropertyBase } from "@/core/property/property-base";
import { BaseSchema, InferSchema } from "@/core/schema";
import { Entity } from "@/core/entity";

export class Store<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> {
  public readonly array: Array<Entity<EntityType>> = [];
  public readonly map: Map<string, Entity<EntityType>> = new Map<
    string,
    Entity<EntityType>
  >();

  public add() {}

  public remove() {}

  
}
