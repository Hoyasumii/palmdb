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

  public set(path: string, key: string): void {
    const [collection, property] = path.split("/");

    if (!collection) {
      this.setCollection(collection);
    }

    if (!property) {
      this.items[collection][property] = {};
    }

    if (this.exists(`${path}/${key}`)) throw new Error();

    this.items[collection][property][key] = null;
  }

  public exists(path: string): boolean {
    const [collection, property, key] = path.split("/");

    if (key in this.items[collection][property]) return true;

    return false;
  }
}
