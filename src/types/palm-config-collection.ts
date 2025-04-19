import type {
	UnknownKeysParam,
	z,
	ZodObject,
	ZodRawShape,
	ZodTypeAny,
} from "zod";

export interface PalmConfigCollection<
	Shape extends ZodRawShape,
	Schema extends ZodObject<
		Shape,
		UnknownKeysParam,
		ZodTypeAny
	> = ZodObject<Shape>,
> {
	schema: Schema;
	rules?: {
		uniqueKeys?: Array<keyof z.infer<Schema>>;
	};
}
