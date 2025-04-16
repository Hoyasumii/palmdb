import type { PalmInterface, CollectionInterface } from "@/core/types";
import { Coconut } from "./coconut";
import type { ZodObject, ZodRawShape } from "zod";
import type { PalmConfig } from "@/types";
import type { ProviderInterface } from "@/core/providers/types";
import nodeProvider from "./providers/node";

export class Palm<
	Keys extends string,
	Schemas extends Record<string, ZodObject<ZodRawShape>>,
> implements PalmInterface<Keys, Schemas>
{
	coconut = new Coconut();
	public provider: ProviderInterface;

	constructor(
		public config: PalmConfig<Keys, Schemas>,
		public providerType: "node" | "bun" = "node",
	) {
		if (providerType === "bun") throw new Error();

		this.provider = nodeProvider;
	}

	database = { export: null, import: null };

	pick<TargetKeys extends keyof typeof this.config.schema>(
		target: TargetKeys,
	): CollectionInterface<Schemas[TargetKeys]> {
		throw new Error("Method not implemented.");
	}
}
