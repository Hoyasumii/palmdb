import type { PalmConfig } from "@/types";
import type { CollectionInterface } from "@/types/collection-interface";
import type { PalmInterface } from "@/types/palm-interface";
import type { z } from "zod";
import config from "~/palm.config";
import type { Coconut } from "./coconut";

export class Palm<
  T extends keyof typeof config.schema,
  S extends Record<string, z.ZodObject<any>> = typeof config.schema
> implements PalmInterface<T, z.infer<S[T]>>
{
  constructor(
    public config: PalmConfig<T, z.TypeOf<S[T]>>,
    private coconut: Coconut
  ) {}

  database: { export: null; import: null } = { export: null, import: null };
  init = null;
  migrate = null;

  select(target: T): CollectionInterface<z.TypeOf<S[T]>[T]> {
    throw new Error("Method not implemented.");
  }
}
