import type { PalmInterface, CollectionInterface } from "@/core/types";
import { Coconut } from "./coconut";
import type { ZodObject, ZodRawShape } from "zod";
import type { PalmConfig } from "@/types";

export class Palm<
	Keys extends string,
	Schemas extends Record<string, ZodObject<ZodRawShape>>,
> implements PalmInterface<Keys, Schemas>
{
	coconut = new Coconut();

	constructor(
		public config: PalmConfig<Keys, Schemas>,
		public provider: "node" | "bun" = "node",
	) {}

	database = { export: null, import: null };

	pick<TargetKeys extends keyof typeof this.config.schema>(
		target: TargetKeys,
	): CollectionInterface<Schemas[TargetKeys]> {
		throw new Error("Method not implemented.");
	}

	fs = null;
}
