import type { PropertyBase } from "@/core/property/property-base";
import type { BaseSchema } from "./base-schema";

export function getUniqueProperties<
  Keys extends string,
  Schema extends Record<Keys, PropertyBase>
>(schema: BaseSchema<Keys, Schema>): string[] {
  const schemaProperties = Object.keys(schema.value);

  return schemaProperties.filter(
    (property) => schema.value[property as keyof typeof schema.value].unique
  );
}
