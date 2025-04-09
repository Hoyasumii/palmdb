import { Coconut } from "@/core/coconut";
import type { OperationCost } from "./operation-cost";
import type { ZodObject, ZodRawShape } from "zod";

export interface CollectionInterface<CollectionType> {
  items: Record<string, CollectionType>;
  coconut: Coconut;
  schema: ZodObject<ZodRawShape>;
  save: () => Promise<void>;

  create(data: CollectionType): Promise<string>;

  update(
    where: string,
    data: Partial<CollectionType>
  ): Promise<CollectionType>;
  update(
    where: string,
    data: (target: CollectionType) => CollectionType
  ): Promise<CollectionType>;
  update(
    where: (id: string, target: CollectionType) => boolean,
    data: Partial<CollectionType>
  ): Promise<OperationCost<Array<CollectionType>>>;
  update(
    where: (id: string, target: CollectionType) => boolean,
    data: (target: CollectionType) => CollectionType
  ): Promise<OperationCost<Array<CollectionType>>>;

  // read(where: string): Promise<CollectionType>;
  // read(where: (target: CollectionType) => boolean): Promise<CollectionType>;

  // delete(where: string): Promise<CollectionType>;
  // delete(
  //   where: (target: CollectionType) => boolean
  // ): Promise<OperationCost<CollectionType>>;
}
