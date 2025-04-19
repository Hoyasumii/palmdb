import type { PalmConfigCollection } from "@/types";
import type { ZodObject, ZodRawShape } from "zod";

export function defineCollection<
	Shape extends ZodRawShape,
	Schema extends ZodObject<Shape>,
>(
	collection: PalmConfigCollection<Shape, Schema>,
): PalmConfigCollection<Shape, Schema> {
	return collection;
}
