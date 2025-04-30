import { BaseError } from "./base-error";

export class ResourceNotFoundError extends BaseError {
  constructor() {
    super({
      errorName: ResourceNotFoundError.name,
      message: "Resource not Found Error",
    });
  }
}
