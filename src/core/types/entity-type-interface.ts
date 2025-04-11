export type EntityTypeInterface<TargetType> = {
	_id: string;
	_createdAt: Date;
	_updatedAt?: Date;
} & TargetType;
