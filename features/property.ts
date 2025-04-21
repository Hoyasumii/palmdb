import { PropertyImpl } from "./property-impl";
import type { PropertyInterface } from "./types/property-interface";
import type { PropertyTypes } from "./types/property-types";

export function property<PropertyType extends keyof PropertyTypes>(
	props: { type: PropertyType; nullable: true } & Partial<
		Pick<PropertyInterface<PropertyType>, "unique">
	>,
): PropertyImpl<PropertyType, true>;

export function property<PropertyType extends keyof PropertyTypes>(
	props: { type: PropertyType } & Partial<
		Pick<PropertyInterface<PropertyType>, "nullable" | "unique">
	>,
): PropertyImpl<PropertyType, false>;

export function property<
	PropertyType extends keyof PropertyTypes,
	IsNullable extends boolean = boolean,
>(
	props: Partial<Pick<PropertyInterface<PropertyType>, "nullable" | "unique">> &
		Pick<PropertyInterface<PropertyType>, "type">,
): PropertyImpl<PropertyType, IsNullable> {
	return new PropertyImpl<PropertyType, IsNullable>(props);
}
