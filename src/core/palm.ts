import type { CollectionInterface } from "@/types/collection-interface";
import type { PalmInterface } from "@/types/palm-interface";
import palmConfig from "~/palm.config";
import { Coconut } from "./coconut";
import type { ZodObject, ZodRawShape } from "zod";

type PalmSchemaKeys = keyof typeof palmConfig.schema;
type PalmSchemaValues = Record<PalmSchemaKeys, ZodObject<ZodRawShape>>;

export class Palm implements PalmInterface<PalmSchemaKeys, PalmSchemaValues> {
  config = palmConfig;
  coconut = new Coconut();

  database: { export: null; import: null } = { export: null, import: null };
  init = null;
  migrate = null;

  select(
    target: PalmSchemaKeys
  ): CollectionInterface<PalmSchemaValues[PalmSchemaKeys]> {
    throw new Error("Method not implemented.");
  }

  fs = null;
}
