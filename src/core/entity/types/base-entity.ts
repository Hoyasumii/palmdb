export type BaseEntity<TargetType extends object> = {
	_id: string;
	_createdAt: Date;
	_updatedAt?: Date;
} & TargetType;
