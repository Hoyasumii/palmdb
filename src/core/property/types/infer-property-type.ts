import type { PropertyImplInterface } from "./property-impl-interface";
import type { PropertyTypes } from "./property-types";

export type InferPropertyType<P> = P extends PropertyImplInterface<
	infer PropertyType,
	infer IsNullable
>
	? PropertyType extends keyof PropertyTypes
		? IsNullable extends true
			? PropertyTypes[PropertyType] | null
			: PropertyTypes[PropertyType]
		: never
	: never;
