import type { OperationCost } from "@/types";
import type { EntityInterface } from "./entity-interface";

export interface CollectionInterface<
	BaseEntity,
	Entity extends EntityInterface<BaseEntity>,
> {
	create(data: BaseEntity): Promise<string>;

	updateUnique(id: string, data: Partial<BaseEntity>): Promise<Entity>;
	updateUnique(
		id: string,
		data: (target: BaseEntity) => BaseEntity,
	): Promise<Entity>;

	updateMany(
		where: (target: Entity) => boolean,
		data: Partial<BaseEntity>,
	): Promise<Required<OperationCost<Array<Entity>>>>;
	updateMany(
		where: (target: Entity) => boolean,
		data: (target: BaseEntity) => BaseEntity,
	): Promise<Required<OperationCost<Array<Entity>>>>;

	findUnique(id: string): Promise<Entity>;
	findMany(
		where: (target: Entity) => boolean,
	): Promise<Omit<OperationCost<Array<Entity>>, "affectedItems">>;

	deleteUnique(id: string): Promise<Entity>;

	deleteMany(
		where: (target: Entity) => boolean,
	): Promise<OperationCost<Array<Entity>>>;

	length(): Promise<number>;
}
