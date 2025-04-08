import type { ZodObject, ZodRawShape } from "zod";

export interface PalmConfig<
  Keys extends string,
  Schemas extends Record<Keys, ZodObject<ZodRawShape>>
> {
  enableFileSystem: boolean;
  schema: Schemas;
  secret: string;
}
