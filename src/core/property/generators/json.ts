import { PropertyBase } from "../property-base";

type PropertyImplConstructorProps = Partial<
	Pick<PropertyBase<"json">, "nullable" | "unique">
>;

export function json<IsNullable extends boolean = boolean>(
	props?: { nullable: true } & Partial<Pick<PropertyBase<"json">, "unique">>,
): PropertyBase<"json", true>;

export function json<IsNullable extends boolean = boolean>(
	props?: Partial<Pick<PropertyBase<"json">, "nullable" | "unique">>,
): PropertyBase<"json", false>;

export function json<IsNullable extends boolean = boolean>(
	props?: PropertyImplConstructorProps,
): PropertyBase<"json", IsNullable> {
	return new PropertyBase<"json", IsNullable>({ type: "json", ...props });
}
