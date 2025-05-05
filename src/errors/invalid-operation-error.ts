import { BaseError } from "./base-error";

export class InvalidOperationError extends BaseError {
  constructor() {
    super({
      errorName: InvalidOperationError.name,
      message: "Invalid Operation Error",
    });
  }
}
