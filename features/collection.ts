import { property } from "./property";
import type { PropertyImpl } from "./property-impl";
import type { InferPropertyType } from "./types/infer-property-type";
import type { PropertyTypes } from "./types/property-types";

class Collection<Schema extends Record<string, PropertyImpl>> {
	constructor(public a: Schema) {}

	getShape(): {
		[K in keyof Schema]: InferPropertyType<Schema[K]>;
	} {
		throw new Error("not implemented");
	}
}

const myCollection = new Collection({
	name: property({ type: "string" }),
	email: property({ type: "string", unique: true }),
	heigth: property({ type: "number" }),
	birthDate: property({ type: "date", nullable: true }),
	isMale: property({ type: "boolean" })
});

myCollection.getShape();
