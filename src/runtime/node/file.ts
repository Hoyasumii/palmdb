import type { FileInterface } from "@/runtime/types";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { Sharable } from "@/runtime";
import { join } from "@/global/utils";
import { existsSync } from "node:fs";

export class File extends Sharable implements FileInterface {
  async write(path: string, content: Buffer): Promise<string> {
    const newPath = this.getFilename(path);

    const pathParts = path
      .split(/[/\\]+/)
      .map((part) => (part.length === 0 ? "/" : part));

		for (let index = 1; index < pathParts.length; index++) {
			const filename = this.getFilename(join(...pathParts.slice(0, index)));

			if (!existsSync(filename)) await mkdir(filename);
		}

    await writeFile(newPath, content);

    return newPath;
  }

  async read(path: string): Promise<string> {
    const newPath = this.getFilename(path);

    return await readFile(newPath, {
      encoding: "utf-8",
    });
  }
}

