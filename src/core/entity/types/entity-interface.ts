import type { Serializable } from "@/global/types";
import type { BaseEntity } from "./base-entity";

export interface EntityInterface<T extends object>
	extends Serializable<[string, string]> {
	update(content: T): void;
	get baseValue(): T;
	get value(): BaseEntity<T>;
}
