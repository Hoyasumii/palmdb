import type { PropertyImpl } from "../property-impl";
import type { PropertyTypes } from "./property-types";

export type InferPropertyType<P> = P extends PropertyImpl<
	infer K,
	infer IsNullable
>
	? K extends keyof PropertyTypes
		? IsNullable extends true
			? PropertyTypes[K] | null
			: PropertyTypes[K]
		: never
	: never;
