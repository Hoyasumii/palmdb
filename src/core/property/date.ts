import { PropertyImpl } from "./property-impl";
import type { PropertyBase } from "./types/property-base";

type PropertyImplConstructorProps = Partial<
  Pick<PropertyBase<"date">, "nullable" | "unique">
>;

export function date<IsNullable extends boolean = boolean>(
  props?: { nullable: true } & Partial<Pick<PropertyBase<"date">, "unique">>,
): PropertyImpl<"date", true>;

export function date<IsNullable extends boolean = boolean>(
  props?: Partial<Pick<PropertyBase<"date">, "nullable" | "unique">>,
): PropertyImpl<"date", false>;

export function date<IsNullable extends boolean = boolean>(
  props?: PropertyImplConstructorProps,
): PropertyImpl<"date", IsNullable> {
  return new PropertyImpl<"date", IsNullable>({ type: "date", ...props });
}
