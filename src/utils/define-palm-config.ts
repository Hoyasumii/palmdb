import type { PalmConfig } from "@/types/palm-config";
import type { ZodObject, ZodRawShape } from "zod";

export function definePalmConfig<
  Keys extends string,
  Schemas extends Record<Keys, ZodObject<ZodRawShape>>
>(config: PalmConfig<Keys, Schemas>): PalmConfig<Keys, Schemas> {
  return config;
}
