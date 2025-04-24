import type { PropertyBase } from "@/core/property/property-base";
import type { BaseSchema, InferSchema } from "@/core/schema";

type CollectionUniquenessCheckerConstructorProperties<UniquePropertiesType> = {
  uniqueProperties: UniquePropertiesType;
  collectionPath: string;
};

export class CollectionUniquenessChecker<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> {
  private uniqueProperties: Array<string>;
  private collectionPath: string;

  constructor({
    uniqueProperties,
    collectionPath,
  }: CollectionUniquenessCheckerConstructorProperties<Array<string>>) {
    this.uniqueProperties = uniqueProperties;
    this.collectionPath = collectionPath;
  }

  private propertyIsRepeated(property: string, value: string): boolean {
    return global.palm.cache.exists(
      `${this.collectionPath}/${property}/${value}`
    );
  }

  run(entity: EntityType) { // TODO: Terminar essa porra
    const entityEntries = Object.entries(entity);

    for (const uniqueProperty of this.uniqueProperties) {
      global.palm.cache.exists(`${this.collectionPath}/${uniqueProperty}/`);
    }
    // global.palm.cache.exists(`${}`)
  }
}
