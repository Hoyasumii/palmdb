import type { FSInterface } from "@/core/providers/types";
import { existsSync } from "node:fs";
import { mkdir, rm, stat, writeFile } from "node:fs/promises";
import { Sharable } from "@/core/providers";
import { File } from "./file";

export class FS extends Sharable implements FSInterface {
	async touch(filename: string) {
		const newFilename = this.getFilename(filename);

		await writeFile(newFilename, [], {
			encoding: "utf-8",
		});

		return newFilename;
	}

	async rm(path: string, recursive = false): Promise<boolean> {
		try {
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

	async exists(path: string): Promise<boolean> {
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
