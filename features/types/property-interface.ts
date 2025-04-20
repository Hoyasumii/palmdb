import type { PropertyTypes } from "./property-types";

export interface PropertyInterface<
	TypeKey extends keyof PropertyTypes = keyof PropertyTypes,
> {
	type: TypeKey;
	nullable?: boolean;
	unique?: boolean;
}
