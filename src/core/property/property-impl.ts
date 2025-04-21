import type {
	PropertyImplContructor,
	PropertyInterface,
	PropertyTypes,
} from "./types";

export class PropertyImpl<
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

	match(content: PropertyType | null) {
		if (this.nullable && !content) return true;

		if (typeof content === "number" && this.type === "number") return true;
		if (typeof content === "boolean" && this.type === "boolean") return true;
		if (
			typeof content === "object" &&
			(this.type === "json" || this.type === "array")
		) {
			if (Array.isArray(content) && this.type === "array") return true;

			try {
				JSON.parse(content as unknown as string);
				return true;
			} catch (_) {
				return false;
			}
		}

		if (typeof content === "string" && this.type === "date") return true;

		return false;
	}
}
// TODO: Escrever os testes