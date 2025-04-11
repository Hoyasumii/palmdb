import type { z, ZodObject, ZodRawShape } from "zod";

export interface PalmProviderInterface<
	Keys extends string,
	Values extends Record<Keys, Record<string, z.infer<ZodObject<ZodRawShape>>>>,
> {
	items: Values;
	get(): Promise<Values[Keys]>;
	save(data: Record<string, unknown>): Promise<void>;
	randomUUID(): string;
}
