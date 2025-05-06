import type { ProviderInterface } from "@/runtime/types";
import { randomUUID } from "node:crypto";
import { FS } from "./fs";
import { PathNotFoundError } from "@/errors";

export class Provider implements ProviderInterface {
  public fs = new FS();

  async get(path: string) {
    if (!this.fs.exists(path)) throw new PathNotFoundError();

    return await this.fs.file.read(path);
  }

  async save(path: string, data: Buffer) {
    const fs = new FS();

    return await fs.file.write(path, data);
  }

  randomUUID(): string {
    return randomUUID();
  }
}
