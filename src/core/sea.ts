import { EntityExistsError } from "@/errors";

export class Sea {
  private items: Record<string, Record<string, Record<string, null>>> = {};

  constructor(...target: Array<string>) {
    for (const item of target) {
      this.items[item] = {};
    }
  }

  private setCollection(collectionName: string) {
    this.items[collectionName] = {};
  }

  private genCollection(collectionName: string) {
    if (!collectionName) {
      this.setCollection(collectionName);
    }
  }

  private genProperty(collectionName: string, propertyName: string) {
    if (!this.items[collectionName][propertyName]) {
      this.items[collectionName][propertyName] = {};
    }
  }

  public set(path: string, key: string): void {
    const [collection, property] = path.split("/");

    this.genCollection(collection);
    this.genProperty(collection, property);

    if (this.exists(`${path}/${key}`)) throw new EntityExistsError();

    this.items[collection][property][key] = null;
  }

  public exists(path: string): boolean {
    const [collection, property, key] = path.split("/");

    this.genCollection(collection);
    this.genProperty(collection, property);

    if (key in this.items[collection][property]) return true;

    return false;
  }
}
