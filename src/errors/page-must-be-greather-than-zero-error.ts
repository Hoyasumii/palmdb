import { BaseError } from "./base-error";

export class PageMustBeGreatherThanZeroError extends BaseError {
  constructor() {
    super({
      errorName: PageMustBeGreatherThanZeroError.name,
      message: "Page Must Be Greather Than Zero Error",
    });
  }
}
