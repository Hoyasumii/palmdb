import type { PropertyBase } from "../property-base";
import type { PropertyTypes } from "./property-types";

export type PropertyImplContructor<
	PropertyType extends keyof PropertyTypes = keyof PropertyTypes,
> = Partial<Pick<PropertyBase<PropertyType>, "nullable" | "unique">> &
	Pick<PropertyBase<PropertyType>, "type">;
