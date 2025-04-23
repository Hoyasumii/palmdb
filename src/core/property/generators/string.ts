import { PropertyBase } from "../property-base";

type PropertyBaseConstructorProps = Partial<
  Pick<PropertyBase<"string">, "nullable" | "unique">
>;

export function string<IsNullable extends boolean = boolean>(
  props?: { nullable: true } & Partial<Pick<PropertyBase<"string">, "unique">>
): PropertyBase<"string", true>;

export function string<IsNullable extends boolean = boolean>(
  props?: Partial<Pick<PropertyBase<"string">, "nullable" | "unique">>
): PropertyBase<"string", false>;

export function string<IsNullable extends boolean = boolean>(
  props?: PropertyBaseConstructorProps
): PropertyBase<"string", IsNullable> {
  return new PropertyBase<"string", IsNullable>({ type: "string", ...props });
}
