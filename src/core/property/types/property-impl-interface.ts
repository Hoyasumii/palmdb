import type { PropertyBase } from "./property-base";
import type { PropertyTypes } from "./property-types";

export interface PropertyImplInterface<
	PropertyType extends keyof PropertyTypes = keyof PropertyTypes,
	IsNullable extends boolean = boolean,
> extends PropertyBase<PropertyType, IsNullable> {
	readonly type: PropertyType;
	readonly nullable: IsNullable;
	readonly unique: boolean;

	match(content: PropertyType | null): boolean;
}

export type PropertyImplContructor<
	PropertyType extends keyof PropertyTypes = keyof PropertyTypes,
> = Partial<Pick<PropertyBase<PropertyType>, "nullable" | "unique">> &
	Pick<PropertyBase<PropertyType>, "type">;
