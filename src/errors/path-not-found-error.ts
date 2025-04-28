import { BaseError } from "./base-error";

export class PathNotFoundError extends BaseError {
  constructor() {
    super({
      errorName: PathNotFoundError.name,
      message: "Path Not Found Error",
    });
  }
}
