import type { PropertyTypes } from "./property-types";

export interface PropertyInterface<
	PropertyType extends keyof PropertyTypes = keyof PropertyTypes,
	IsNullable extends boolean = boolean,
> {
	type: PropertyType;
	nullable?: IsNullable;
	unique?: boolean;
}
