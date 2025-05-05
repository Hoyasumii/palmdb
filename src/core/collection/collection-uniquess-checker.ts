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

  entityIsUnique(entity: EntityType, id?: string): boolean {
    let returnValue = true;
    const entityEntries = Object.entries(entity);

    for (const [key, value] of entityEntries) {
      if (
        !this.uniqueProperties.find((uniqueProperty) => uniqueProperty === key)
      )
        continue;

      if (this.propertyIsRepeated(key, value as string)) {
        // console.log(global.palm.cache.get(`${this.collectionPath}/${key}/${value}`))
        // console.log(id);
        if (global.palm.cache.get(`${this.collectionPath}/${key}/${value}`) !== id)
          returnValue = false;
      }
    }

    return returnValue;
  }
}
