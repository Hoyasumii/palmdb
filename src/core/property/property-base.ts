import type {
	PropertyImplContructor,
	PropertyInterface,
	PropertyTypes,
} from "./types";

export class PropertyBase<
	PropertyType extends keyof PropertyTypes = keyof PropertyTypes,
	IsNullable extends boolean = boolean,
> implements PropertyInterface<PropertyType, IsNullable>
{
	readonly type: PropertyType;
	readonly nullable: IsNullable;
	readonly unique: boolean;

	constructor({
		type,
		nullable,
		unique,
	}: PropertyImplContructor<PropertyType>) {
		this.type = type;
		this.nullable = (nullable ?? false) as IsNullable;
		this.unique = unique ?? false;
	}
}
