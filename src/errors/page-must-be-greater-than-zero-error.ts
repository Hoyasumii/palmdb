import { BaseError } from "./base-error";

export class PageMustBeGreaterThanZeroError extends BaseError {
  constructor() {
    super({
      errorName: PageMustBeGreaterThanZeroError.name,
      message: "Page Must Be Greater Than Zero Error",
    });
  }
}
