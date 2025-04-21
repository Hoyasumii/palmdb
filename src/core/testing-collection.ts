import { property } from "./property";
import type { PropertyImpl } from "./property/property-impl";
import type { InferPropertyType } from "./property/types";

class Collection<
  Keys extends string,
  Schema extends Record<Keys, PropertyImpl>,
> {
  constructor(public schema: Schema) {}

  getValue(): {
    [K in keyof Schema]: InferPropertyType<Schema[K]>;
  } {
    return this.schema as unknown as {
      [K in keyof Schema]: InferPropertyType<Schema[K]>;
    };
  }
}

const myCollection = new Collection({
  name: property({ type: "string" }),
  email: property({ type: "string", unique: true }),
  heigth: property({ type: "number" }),
  birthDate: property({ type: "date", nullable: true }),
  isMale: property({ type: "boolean" }),
});

myCollection.getValue();
