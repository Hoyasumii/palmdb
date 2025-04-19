import type { z, ZodObject, ZodRawShape, ZodType } from "zod";

export interface PalmConfigCollection<Schema extends ZodType> {
	schema: z.infer<Schema>;
	rules: {
		uniqueKeys?: Array<keyof z.infer<Schema>>;
	};
}
