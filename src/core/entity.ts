import type { EntityInterface } from "./types";

export class Entity<T extends object> {
	private data: EntityInterface<T>;

	constructor(newValue: T, id: string, createdAt?: Date, updatedAt?: Date) {
		this.data = {
			_id: id,
			_createdAt: createdAt || new Date(),
			_updatedAt: updatedAt,
			...newValue,
		};
	}

	update(content: T) {
		this.data = { ...this.data, _updatedAt: new Date(), ...content };
	}

	get baseValue(): T {
		const { _id: _0, _createdAt: _1, _updatedAt: _2, ...content } = this.data;

		return content as T;
	}

	get value(): EntityInterface<T> {
		return this.data;
	}

	serialize(): [string, string] {
		const { _id, ...otherProperties } = this.data;
		return [_id, JSON.stringify(otherProperties)];
	}

	static deserialize<NewObjectType extends object>(
		id: string,
		content: string,
	): Entity<NewObjectType> {
		const {
			_createdAt: createdAt,
			_updatedAt: updatedAt,
			...otherProperties
		} = JSON.parse(content) as Omit<EntityInterface<NewObjectType>, "_id">;

		return new Entity<NewObjectType>(
			otherProperties as NewObjectType,
			id,
			createdAt,
			updatedAt,
		);
	}
}
