import type { ZodObject, ZodRawShape } from "zod";
import type { PalmRules } from "./palm-rules";
import type { PalmConfigCollection } from "./palm-config-collection";

export interface PalmConfig<
	Keys extends string,
	Schemas extends Record<Keys, ZodObject<ZodRawShape>>,
> {
	secret: string;
	collections: Record<Keys, PalmConfigCollection<Schemas[Keys]>>;
}
