import { mkdir, rm, stat } from "node:fs/promises";
import { Sharable } from "../sharable";
import type { FSInterface } from "../types";
import { existsSync } from "node:fs";
import { File } from "./file";

export class FS extends Sharable implements FSInterface {
  async touch(filename: string) {
    const newFilename = this.getFilename(filename);

    await Bun.write(newFilename, "");

    return newFilename;
  }

  async rm(path: string, recursive = false): Promise<boolean> {
    try {
      if (!recursive) {
        await Bun.file(path).delete();

        return true;
      }

      await rm(this.getFilename(path), {
        recursive,
      });

      return true;
    } catch (_) {
      return false;
    }
  }

  async mkDir(path: string): Promise<string> {
    const newPath = this.getFilename(path);

    await mkdir(newPath);

    return newPath;
  }

  exists(path: string): boolean {
    const newPath = this.getFilename(path);

    return existsSync(newPath);
  }

  async isFileOrDir(path: string): Promise<"file" | "dir" | false> {
    const newPath = this.getFilename(path);

    const dataStats = await stat(newPath);

    if (dataStats.isFile()) return "file";
    if (dataStats.isDirectory()) return "dir";
    return false;
  }

  file = new File();
}
