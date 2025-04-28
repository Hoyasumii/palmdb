type BaseErrorConstructorProperties = {
  errorName: string;
  message: string;
};

export class BaseError extends Error {
  constructor({ errorName, message }: BaseErrorConstructorProperties) {
    if (!global.palm) throw new Error("Palm is not provided");

    global.palm.coconut.release();
    super(message);
    this.name = errorName;
  }
}
