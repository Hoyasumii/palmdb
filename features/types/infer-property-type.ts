import type { PropertyImpl } from "../property-impl";
import type { PropertyTypes } from "./property-types";

export type InferPropertyType<P extends PropertyImpl> = P extends PropertyImpl<
	infer K
>
	? K extends keyof PropertyTypes
		? P["nullable"] extends true
			? PropertyTypes[K] | null
			: PropertyTypes[K]
		: never
	: never;
