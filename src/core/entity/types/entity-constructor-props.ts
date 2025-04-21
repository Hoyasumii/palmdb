export interface EntityConstructorProps<T> {
	value: T;
	id: string;
	createdAt?: Date;
	updatedAt?: Date;
}
