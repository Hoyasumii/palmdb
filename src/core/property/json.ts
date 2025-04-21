import { PropertyImpl } from "./property-impl";
import type { PropertyBase } from "./types/property-base";

type PropertyImplConstructorProps = Partial<
	Pick<PropertyBase<"json">, "nullable" | "unique">
>;

export function json<IsNullable extends boolean = boolean>(
	props?: { nullable: true } & Partial<Pick<PropertyBase<"json">, "unique">>,
): PropertyImpl<"json", true>;

export function json<IsNullable extends boolean = boolean>(
	props?: Partial<Pick<PropertyBase<"json">, "nullable" | "unique">>,
): PropertyImpl<"json", false>;

export function json<IsNullable extends boolean = boolean>(
	props?: PropertyImplConstructorProps,
): PropertyImpl<"json", IsNullable> {
	return new PropertyImpl<"json", IsNullable>({ type: "json", ...props });
}
