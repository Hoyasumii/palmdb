import { PropertyImpl } from "./property-impl";
import type { PropertyBase } from "./types/property-base";

type PropertyImplConstructorProps = Partial<
	Pick<PropertyBase<"string">, "nullable" | "unique">
>;

export function string<IsNullable extends boolean = boolean>(
	props?: { nullable: true } & Partial<Pick<PropertyBase<"string">, "unique">>,
): PropertyImpl<"string", true>;

export function string<IsNullable extends boolean = boolean>(
	props?: Partial<Pick<PropertyBase<"string">, "nullable" | "unique">>,
): PropertyImpl<"string", false>;

export function string<IsNullable extends boolean = boolean>(
	props?: PropertyImplConstructorProps,
): PropertyImpl<"string", IsNullable> {
	return new PropertyImpl<"string", IsNullable>({ type: "string", ...props });
}
