import type { InferPropertyType } from "@/core/property/types";
import type { BaseSchema } from "./base-schema";

// biome-ignore lint/suspicious/noExplicitAny: <I wanted to make typing easier>
export type InferSchema<T extends BaseSchema<any, any>> = {
	[K in keyof T["value"]]: InferPropertyType<T["value"][K]>;
};
