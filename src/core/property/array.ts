import { PropertyImpl } from "./property-impl";
import type { PropertyBase } from "./types/property-base";

type PropertyImplConstructorProps = Partial<
  Pick<PropertyBase<"array">, "nullable" | "unique">
>;

export function array<IsNullable extends boolean = boolean>(
  props?: { nullable: true } & Partial<Pick<PropertyBase<"array">, "unique">>,
): PropertyImpl<"array", true>;

export function array<IsNullable extends boolean = boolean>(
  props?: Partial<Pick<PropertyBase<"array">, "nullable" | "unique">>,
): PropertyImpl<"array", false>;

export function array<IsNullable extends boolean = boolean>(
  props?: PropertyImplConstructorProps,
): PropertyImpl<"array", IsNullable> {
  return new PropertyImpl<"array", IsNullable>({ type: "array", ...props });
}
