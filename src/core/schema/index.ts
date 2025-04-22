import type { PropertyImpl } from "@/core/property/property-base";
import { BaseSchema } from "./base-schema";

export function schema<
	Keys extends string,
	Schema extends Record<Keys, PropertyImpl>,
>(content: Schema): BaseSchema<Keys, Schema> {
	return new BaseSchema(content);
}

export type { BaseSchema } from "./base-schema";
export type { InferSchema } from "./infer-schema";
