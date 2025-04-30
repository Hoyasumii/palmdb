import { BaseError } from "./base-error";

export class LimitMustBeGreatherThanZeroError extends BaseError {
  constructor() {
    super({
      errorName: LimitMustBeGreatherThanZeroError.name,
      message: "Limit Must Be Greather Than Zero Error",
    });
  }
}
