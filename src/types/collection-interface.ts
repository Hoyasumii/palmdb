import { Coconut } from "@/core/coconut";
import type { OperationCost } from "./operation-cost";

export interface CollectionInterface<CollectionType> {
  items: Record<string, CollectionType>;
  coconut: Coconut;

  create(data: CollectionType): Promise<OperationCost<string>>;

  update(
    where: string,
    data: Partial<CollectionType>
  ): Promise<OperationCost<CollectionType>>;
  update(
    where: string,
    data: (target: CollectionType) => CollectionType
  ): Promise<OperationCost<CollectionType>>;
  update(
    where: (target: CollectionType) => boolean,
    data: Partial<CollectionType>
  ): Promise<OperationCost<Array<CollectionType>>>;
  update(
    where: (target: CollectionType) => boolean,
    data: (target: CollectionType) => CollectionType
  ): Promise<OperationCost<Array<CollectionType>>>;

  read(where: string): Promise<CollectionType>;
  read(where: (target: CollectionType) => boolean): Promise<CollectionType>;

  safeRead(where: string): Promise<CollectionType | null>;
  safeRead(
    where: (target: CollectionType) => boolean
  ): Promise<CollectionType | null>;

  delete(where: string): Promise<OperationCost<CollectionType>>;
  delete(
    where: (target: CollectionType) => boolean
  ): Promise<OperationCost<CollectionType>>;

  safeDelete(where: string): Promise<OperationCost<CollectionType | null>>;
  safeDelete(
    where: (target: CollectionType) => boolean
  ): Promise<OperationCost<CollectionType | null>>;

  // exportDatabase(): void;
  // importDatabase(): void;
}
