export interface CreateCollectionInterface<TargetType> {
	create(data: TargetType): Promise<string>;
}
