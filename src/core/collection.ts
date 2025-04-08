export class Collection<CollectionType> {
  async create() {}

  async update(data: string): Promise<void>;
  async update(data: number): Promise<void>;
  async update() {}
}
