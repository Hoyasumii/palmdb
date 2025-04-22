import type { PropertyBase } from "@/core/property/property-base";
import type { BaseSchema } from "./base-schema";
import type { InferSchema } from "./infer-schema";
import { propertyValidator } from "@/core/property";
import type { InferPropertyType } from "@/core/property/types";

export class SchemaValidator<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> {
  constructor(private readonly schema: BaseSchema<Keys, Schema>) {}

  private propertyIsMatching<TargetKey extends keyof Schema>(
    key: TargetKey,
    property: EntityType[TargetKey]
  ): boolean {
    return propertyValidator(
      this.schema.value[key],
      property as InferPropertyType<Schema[TargetKey]>
    );
  }

  validate(entity: EntityType) {
    let returnType = true;

    for (const [key, value] of Object.entries(entity)) {
      if (
        !this.propertyIsMatching(
          key as keyof Schema,
          value as EntityType[keyof Schema]
        )
      )
        returnType = false;
    }

    return returnType;
  }
}
