import { PropertyBase } from "../property-base";

type PropertyBaseConstructorProps = Partial<
	Pick<PropertyBase<"number">, "nullable" | "unique">
>;

export function number<IsNullable extends boolean = boolean>(
	props?: { nullable: true } & Partial<Pick<PropertyBase<"number">, "unique">>,
): PropertyBase<"number", true>;

export function number<IsNullable extends boolean = boolean>(
	props?: Partial<Pick<PropertyBase<"number">, "nullable" | "unique">>,
): PropertyBase<"number", false>;

export function number<IsNullable extends boolean = boolean>(
	props?: PropertyBaseConstructorProps,
): PropertyBase<"number", IsNullable> {
	return new PropertyBase<"number", IsNullable>({ type: "number", ...props });
}
