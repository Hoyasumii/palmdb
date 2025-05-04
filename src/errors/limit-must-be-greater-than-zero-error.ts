import { BaseError } from "./base-error";

export class LimitMustBeGreaterThanZeroError extends BaseError {
  constructor() {
    super({
      errorName: LimitMustBeGreaterThanZeroError.name,
      message: "Limit Must Be Greather Than Zero Error",
    });
  }
}
