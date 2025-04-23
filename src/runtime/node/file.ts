import type { FileInterface } from "@/runtime/types";
import { readFile, writeFile } from "node:fs/promises";
import { Sharable } from "@/runtime";

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
