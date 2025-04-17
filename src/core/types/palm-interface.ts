import type { z, ZodObject, ZodRawShape } from "zod";
import type { PalmConfig } from "@/types";
import type { CollectionInterface } from "./collection-interface";
import type { Coconut } from "@/core/coconut";
import type { ProviderInterface } from "@/core/providers/types";

export interface PalmInterface<
	Keys extends string,
	Values extends Record<Keys, ZodObject<ZodRawShape>>,
> {
	config: PalmConfig<Keys, Values>;
	provider: ProviderInterface;
	providerType?: "node" | "bun";

	coconut: Coconut;

	database?: {
		export: null;
		import: null;
	};

	start(): Promise<void>;

	pick(target: Keys): Promise<CollectionInterface<z.infer<Values[Keys]>>>;
}
