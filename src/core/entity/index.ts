import type {
	BaseEntity,
	EntityConstructorProps,
	EntityInterface,
} from "./types";

export class Entity<TargetType extends object>
	implements EntityInterface<TargetType>
{
	private data: BaseEntity<TargetType>;

	constructor({
		id,
		value,
		createdAt,
		updatedAt,
	}: EntityConstructorProps<TargetType>) {
		this.data = {
			_id: id,
			_createdAt: createdAt || new Date(),
			_updatedAt: updatedAt,
			...value,
		};
	}

	get baseValue(): TargetType {
		const { _id: _0, _createdAt: _1, _updatedAt: _2, ...content } = this.data;

		return content as TargetType;
	}

	get value() {
		return this.data;
	}

	update(content: TargetType) {
		this.data = { ...this.data, ...content, _updatedAt: new Date() };
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
		} = JSON.parse(content) as Omit<BaseEntity<NewObjectType>, "_id">;

		return new Entity<NewObjectType>({
			value: otherProperties as NewObjectType,
			id,
			createdAt,
			updatedAt,
		});
	}
}
