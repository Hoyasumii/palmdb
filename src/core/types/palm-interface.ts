import type { ZodObject, ZodRawShape } from "zod";
import type { PalmConfig } from "@/types";
import type { CollectionInterface } from "./collection-interface";
import type { Coconut } from "@/core/coconut";

export interface PalmInterface<
  Keys extends string,
  Values extends Record<Keys, ZodObject<ZodRawShape>>
> {
  config: PalmConfig<Keys, Values>;
  provider?: "node" | "bun";
  coconut: Coconut;

  database?: {
    export: null;
    import: null;
  };

  pick(target: Keys): CollectionInterface<Values[Keys]>;

  fs?: null;
}
