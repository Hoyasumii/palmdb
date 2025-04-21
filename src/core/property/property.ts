import { PropertyImpl } from "./property-impl";
import type { PropertyTypes } from "./types";
import type { PropertyBase } from "./types/property-base";

export function property<PropertyType extends keyof PropertyTypes>(
	props: { type: PropertyType; nullable: true } & Partial<
		Pick<PropertyBase<PropertyType>, "unique">
	>,
): PropertyImpl<PropertyType, true>;

export function property<PropertyType extends keyof PropertyTypes>(
	props: { type: PropertyType } & Partial<
		Pick<PropertyBase<PropertyType>, "nullable" | "unique">
	>,
): PropertyImpl<PropertyType, false>;

export function property<
	PropertyType extends keyof PropertyTypes,
	IsNullable extends boolean = boolean,
>(
	props: Partial<Pick<PropertyBase<PropertyType>, "nullable" | "unique">> &
		Pick<PropertyBase<PropertyType>, "type">,
): PropertyImpl<PropertyType, IsNullable> {
	return new PropertyImpl<PropertyType, IsNullable>(props);
}
