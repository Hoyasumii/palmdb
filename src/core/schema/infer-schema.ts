import type { InferPropertyType } from "@/core/property/types";

// biome-ignore lint/suspicious/noExplicitAny: <I wanted to make typing easier>
export type InferSchema<T extends Collection<any, any>> = {
	[K in keyof T["schema"]]: InferPropertyType<T["schema"][K]>;
};
