import { stringIsDate } from "@/global/utils";
import type { PropertyBase } from "./property-base";
import type { InferPropertyType } from "./types";

export function propertyValidator<TargetProperty extends PropertyBase>(
  property: TargetProperty,
  value: InferPropertyType<TargetProperty>
): boolean {
  if (property.nullable === true && !value) return true;

  if (property.type === "array" && Array.isArray(value)) return true;
  if (property.type === "boolean" && typeof value === "boolean") return true;
  if (property.type === "date" && stringIsDate(value as string)) return true;
  if (property.type === "number" && typeof value === "number") return true;
  if (property.type === "string" && typeof value === "string") return true;
  if (property.type === "json" && typeof value === "object") return true;

  return false;
}
