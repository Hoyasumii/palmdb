export class EntityExistsError extends Error {
  constructor() {
    super("Unique Entity Exists Error");
  }
}
