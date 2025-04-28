import { BaseError } from "./base-error";

export class CollectionRepositoryCannotBeExtendedError extends BaseError {
  constructor() {
    super({
      errorName: CollectionRepositoryCannotBeExtendedError.name,
      message: "Collection Repository Cannot be Extended Error",
    });
  }
}
