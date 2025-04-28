import { BaseError } from "./base-error";

export class EntityNotMatchWithSchemaError extends BaseError {
  constructor() {
    super({
      errorName: EntityNotMatchWithSchemaError.name,
      message: "Entity not Match With Schema Error",
    });
  }
}
