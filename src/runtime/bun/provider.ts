import type { ProviderInterface } from "@/runtime/types";
import { FS } from "./fs";
import { randomUUIDv7 } from "bun";
import { PathNotFoundError } from "@/errors";

export class Provider implements ProviderInterface {
  public fs = new FS();

  async get(path: string) {
    if (!(this.fs.exists(path))) throw new PathNotFoundError();

    return await this.fs.file.read(path);
  }

  async save(path: string, data: Buffer) {
    return await this.fs.file.write(path, data);
  }

  randomUUID(): string {
    return randomUUIDv7();
  }
}
