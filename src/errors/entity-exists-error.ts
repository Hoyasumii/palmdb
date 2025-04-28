import { BaseError } from "./base-error";

export class EntityExistsError extends BaseError {
  constructor() {
    super({
      errorName: EntityExistsError.name,
      message: "Unique Entity Exists Error",
    });
  }
}
