import type { PropertyInterface } from "./types/property-interface";
import type { PropertyTypes } from "./types/property-types";

export class PropertyImpl<K extends keyof PropertyTypes = keyof PropertyTypes>
	implements PropertyInterface<K>
{
	type: K;
	nullable: boolean;
	unique: boolean;

	constructor({ type, nullable, unique }: PropertyInterface<K>) {
		this.type = type;
		this.nullable = nullable ?? false;
		this.unique = unique ?? false;
	}

	match(content: K | null) {
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
