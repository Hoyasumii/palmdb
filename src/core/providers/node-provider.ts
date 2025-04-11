import type { PalmProviderInterface } from "@/core/types";
import type { z, ZodObject, ZodRawShape } from "zod";
import { randomUUID } from "node:crypto";

export class NodeProvider<
	Keys extends string,
	Values extends Record<Keys, Record<string, z.infer<ZodObject<ZodRawShape>>>>,
> implements PalmProviderInterface<Keys, Values>
{
	async get(): Promise<Values[Keys]> {}

	items = {
    
  };

	randomUUID() {
		return randomUUID();
	}

  async save(data: Record<string, unknown>): Promise<void> {
      
  }
}
