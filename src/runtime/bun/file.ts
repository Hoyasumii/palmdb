import { Sharable } from "@/runtime";
import type { FileInterface } from "@/runtime/types";

export class File extends Sharable implements FileInterface {
  async write(path: string, content: string): Promise<string> {
    const newPath = this.getFilename(path);

    await Bun.write(newPath, content);

    return newPath;
  }

  async read(path: string): Promise<string> {
    const newPath = this.getFilename(path);

    return await Bun.file(newPath).text();
  }
}
