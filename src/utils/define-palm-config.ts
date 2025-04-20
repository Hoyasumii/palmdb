import type { PalmConfigCollection } from "@/types";
import type { PalmConfig } from "@/types/palm-config";
import type { AnyZodObject } from "@/types/palm-config-collection";

export function definePalmConfig<
	Collections extends Record<string, PalmConfigCollection<AnyZodObject>>,
>(config: PalmConfig<Collections>): PalmConfig<Collections> {
	return config;
}
