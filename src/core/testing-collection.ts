import { boolean, date, number, property } from "./property";
import type { PropertyImpl } from "./property/property-impl";
import { string } from "./property/string";
import type { InferPropertyType } from "./property/types";
import type { InferSchema } from "./schema";

class Collection<
	Keys extends string,
	Schema extends Record<Keys, PropertyImpl>,
> {
	constructor(public schema: Schema) {}

	getValue(): {
		[K in keyof Schema]: InferPropertyType<Schema[K]>;
	} {
		return this.schema as unknown as {
			[K in keyof Schema]: InferPropertyType<Schema[K]>;
		};
	}
}

const myCollection = new Collection({
	name: string({ nullable: true }),
	email: string({ unique: true }),
	heigth: number({}),
	birthDate: date({ nullable: true }),
	isMale: boolean({}),
});

//  string({ nullable: boolean })

const a = myCollection.getValue();
