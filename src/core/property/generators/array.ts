import { PropertyBase } from "../property-base";

type PropertyImplConstructorProps = Partial<
  Pick<PropertyBase<"array">, "nullable" | "unique">
>;

export function array<IsNullable extends boolean = boolean>(
  props?: { nullable: true } & Partial<Pick<PropertyBase<"array">, "unique">>
): PropertyBase<"array", true>;

export function array<IsNullable extends boolean = boolean>(
  props?: Partial<Pick<PropertyBase<"array">, "nullable" | "unique">>
): PropertyBase<"array", false>;

export function array<IsNullable extends boolean = boolean>(
  props?: PropertyImplConstructorProps
): PropertyBase<"array", IsNullable> {
  return new PropertyBase<"array", IsNullable>({ type: "array", ...props });
}
