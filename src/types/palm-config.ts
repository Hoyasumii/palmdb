import type { ZodRawShape } from "zod";
import type { PalmConfigCollection } from "./palm-config-collection";

export interface PalmConfig<
  Collections extends Record<string, PalmConfigCollection<ZodRawShape>>
> {
  secret: string;
  collections: Collections;
}
