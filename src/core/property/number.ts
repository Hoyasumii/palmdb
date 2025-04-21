import { PropertyImpl } from "./property-impl";
import type { PropertyBase } from "./types/property-base";

type PropertyImplConstructorProps = Partial<
	Pick<PropertyBase<"number">, "nullable" | "unique">
>;

export function number<IsNullable extends boolean = boolean>(
	props?: { nullable: true } & Partial<Pick<PropertyBase<"number">, "unique">>,
): PropertyImpl<"number", true>;

export function number<IsNullable extends boolean = boolean>(
	props?: Partial<Pick<PropertyBase<"number">, "nullable" | "unique">>,
): PropertyImpl<"number", false>;

export function number<IsNullable extends boolean = boolean>(
	props?: PropertyImplConstructorProps,
): PropertyImpl<"number", IsNullable> {
	return new PropertyImpl<"number", IsNullable>({ type: "number", ...props });
}
