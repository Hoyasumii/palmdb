import { PropertyImpl } from "./property-impl";
import type { PropertyInterface } from "./types/property-interface";
import type { PropertyTypes } from "./types/property-types";

export function property<PropertyType extends keyof PropertyTypes>(
	props: PropertyInterface<PropertyType>,
): PropertyImpl<PropertyType> {
	return new PropertyImpl(props);
}
