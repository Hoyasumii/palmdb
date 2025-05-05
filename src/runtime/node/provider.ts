import type { ProviderInterface } from "@/runtime/types";
import { randomUUID } from "node:crypto";
import { posix } from "node:path";
import { FS } from "./fs";
import { PathNotFoundError } from "@/errors";

export class Provider implements ProviderInterface {
  public fs = new FS();

  async get(path: string) {
    if (!this.fs.exists(path)) throw new PathNotFoundError();

    return await this.fs.file.read(path);
  }

  async save(path: string, data: string) {
		posix.join()

    return await this.fs.file.write(path, data);
  }

  randomUUID(): string {
    return randomUUID();
  }
}
