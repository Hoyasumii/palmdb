import type { ProviderInterface } from "@/runtime/types";
import { FS } from "./fs";
import { randomUUIDv7 } from "bun";

export class Provider implements ProviderInterface {
  public fs = new FS();

  async get(path: string) {
    if (!(this.fs.exists(path))) throw new Error();

    return await this.fs.file.read(path);
  }

  async save(path: string, data: string) {
    return await this.fs.file.write(path, data);
  }

  randomUUID(): string {
    return randomUUIDv7();
  }
}
