import { PropertyImpl } from "./property-impl";
import type { PropertyBase } from "./types/property-base";

type PropertyImplConstructorProps = Partial<
  Pick<PropertyBase<"boolean">, "nullable" | "unique">
>;

export function boolean<IsNullable extends boolean = boolean>(
  props?: { nullable: true } & Partial<Pick<PropertyBase<"boolean">, "unique">>,
): PropertyImpl<"boolean", true>;

export function boolean<IsNullable extends boolean = boolean>(
  props?: Partial<Pick<PropertyBase<"boolean">, "nullable" | "unique">>,
): PropertyImpl<"boolean", false>;

export function boolean<IsNullable extends boolean = boolean>(
  props?: PropertyImplConstructorProps,
): PropertyImpl<"boolean", IsNullable> {
  return new PropertyImpl<"boolean", IsNullable>({ type: "boolean", ...props });
}
