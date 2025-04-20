import type { z, ZodObject } from "zod";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type AnyZodObject = ZodObject<any, any, any, any, any>;

export interface PalmConfigCollection<Schema extends AnyZodObject> {
	schema: Schema;
	rules?: {
		uniqueKeys?: Array<keyof z.infer<Schema>>;
	};
}
