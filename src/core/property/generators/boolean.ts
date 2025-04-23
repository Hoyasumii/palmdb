import { PropertyBase } from "../property-base";

type PropertyImplConstructorProps = Partial<
  Pick<PropertyBase<"boolean">, "nullable" | "unique">
>;

export function boolean<IsNullable extends boolean = boolean>(
  props?: { nullable: true } & Partial<Pick<PropertyBase<"boolean">, "unique">>,
): PropertyBase<"boolean", true>;

export function boolean<IsNullable extends boolean = boolean>(
  props?: Partial<Pick<PropertyBase<"boolean">, "nullable" | "unique">>,
): PropertyBase<"boolean", false>;

export function boolean<IsNullable extends boolean = boolean>(
  props?: PropertyImplConstructorProps,
): PropertyBase<"boolean", IsNullable> {
  return new PropertyBase<"boolean", IsNullable>({ type: "boolean", ...props });
}
