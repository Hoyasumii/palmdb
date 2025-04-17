import type { FileInterface } from "@/core/providers/types";
import { readFile, writeFile } from "node:fs/promises";
import { Sharable } from "@/core/providers";

export class File extends Sharable implements FileInterface {
	async write(path: string, content: string): Promise<string> {
		const newPath = this.getFilename(path);

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
