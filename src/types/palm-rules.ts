import type { z, ZodObject, ZodRawShape } from "zod";

export interface PalmRules<
	Keys extends string,
	Values extends Record<string, ZodObject<ZodRawShape>>,
> {
	uniqueKeys: Record<keyof Values, keyof z.infer<Values[Keys]>>;
}
