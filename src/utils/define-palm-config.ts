import type { PalmConfig } from "@/types/palm-config";
import { z, type ZodObject, type ZodRawShape } from "zod";

export function definePalmConfig<
  Keys extends string,
  Schemas extends Record<string, ZodObject<ZodRawShape>>
>(config: PalmConfig<Keys, Schemas>): PalmConfig<Keys, Schemas> {
  return config;
}
