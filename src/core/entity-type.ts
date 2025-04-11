import type { EntityTypeInterface } from "./types";

export class EntityType<T extends object> {
	private data: EntityTypeInterface<T>;

	constructor(newValue: T, id: string) {
		this.data = {
			_id: id,
			_createdAt: new Date(),
			_updatedAt: undefined,
			...newValue,
		};
	}

	set update(content: T) {
		this.data = { ...this.data, ...content, _updatedAt: new Date() };
	}

	get baseValue(): T {
		const { _id: _0, _createdAt: _1, _updatedAt: _2, ...content } = this.data;

		return content as T;
	}

	get value(): EntityTypeInterface<T> {
		return this.data;
	}
}
