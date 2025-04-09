import type { ZodObject, ZodRawShape } from "zod";
import { type PalmConfig } from "./palm-config";
import type { CollectionInterface } from "./collection-interface";
import type { Coconut } from "@/core/coconut";

export interface PalmInterface<
  Keys extends string,
  Values extends Record<string, ZodObject<ZodRawShape>>
> {
  config: PalmConfig<Keys, Values>;
  coconut: Coconut;

  database: {
    export: null;
    import: null;
  };

  init: null;
  migrate: null;

  select(target: Keys): CollectionInterface<Values[Keys]>;
  
  fs: null;
}
