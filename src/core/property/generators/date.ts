import { PropertyBase } from "../property-base";

type PropertyImplConstructorProps = Partial<
  Pick<PropertyBase<"date">, "nullable" | "unique">
>;

export function date<IsNullable extends boolean = boolean>(
  props?: { nullable: true } & Partial<Pick<PropertyBase<"date">, "unique">>
): PropertyBase<"date", true>;

export function date<IsNullable extends boolean = boolean>(
  props?: Partial<Pick<PropertyBase<"date">, "nullable" | "unique">>
): PropertyBase<"date", false>;

export function date<IsNullable extends boolean = boolean>(
  props?: PropertyImplConstructorProps
): PropertyBase<"date", IsNullable> {
  return new PropertyBase<"date", IsNullable>({ type: "date", ...props });
}
