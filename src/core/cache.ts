import { EntityExistsError, ResourceNotFoundError } from "@/errors";

type CacheSetProperties = {
  path: string;
  key: string;
  id: string;
};

export class Cache {
  private items: Record<string, Record<string, Record<string, string>>> = {};

  constructor(...target: Array<string>) {
    for (const item of target) {
      this.items[item] = {};
    }
  }

  private setCollection(collectionName: string) {
    this.items[collectionName] = {};
  }

  private genCollection(collectionName: string) {
    if (!this.items[collectionName]) {
      this.setCollection(collectionName);
    }
  }

  private genProperty(collectionName: string, propertyName: string) {
    if (!this.items[collectionName][propertyName]) {
      this.items[collectionName][propertyName] = {};
    }
  }

  public set({ path, key, id }: CacheSetProperties): void {
    const [collection, property] = path.split("/");

    this.genCollection(collection);
    this.genProperty(collection, property);

    if (this.exists(`${path}/${key}`)) throw new EntityExistsError();

    this.items[collection][property][key] = id;
  }

  public get(path: string): string {
    const [collection, property, key] = path.split("/");

    this.genCollection(collection);
    this.genProperty(collection, property);

    if (!(key in this.items[collection][property]))
      throw new ResourceNotFoundError();

    return this.items[collection][property][key];
  }

  public exists(path: string): boolean {
    const [collection, property, key] = path.split("/");

    this.genCollection(collection);
    this.genProperty(collection, property);

    if (key in this.items[collection][property]) return true;

    return false;
  }
}
