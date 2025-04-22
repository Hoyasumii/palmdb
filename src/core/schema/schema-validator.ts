import type { PropertyBase } from "@/core/property/property-base";
import type { BaseSchema } from "./base-schema";
import type { InferSchema } from "./infer-schema";
import { schema } from ".";
import { boolean, date, string } from "../property";
import type { InferPropertyType } from "../property/types";

export class SchemaValidator<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>,
  EntityType extends InferSchema<BaseSchema<Keys, Schema>>
> {
  constructor(private readonly schema: BaseSchema<Keys, Schema>) {}

  propertyIsMatching<TargetKey extends keyof Schema>(
    key: TargetKey,
    property: EntityType[TargetKey]
  ): boolean {
    if (this.schema.value[key].nullable && !property) return true;
    // if (typeof property === "string")

    if (
      this.schema.value[key].type === "string" &&
      typeof property === "string"
    )
      return true;

    // return this.schema[key]
    return true;
  }

  validate(entity: EntityType) {
    return true;
  }
}

const mySchema = schema({
  name: string({}),
  gender: boolean({ nullable: true }),
  birthDate: date({}),
});

const a: InferPropertyType<typeof mySchema.value.name>;

const validator = new SchemaValidator(mySchema);

validator.propertyIsMatching("name", "Abc");

// validator.validate({ name: "Alan", gender: null });
