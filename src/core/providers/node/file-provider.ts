import type { FileProviderInterface } from "@/core/providers/types";
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, rmdir, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

export class FileProvider implements FileProviderInterface {
	constructor(public _basePath: string) {}

	async write(path: string, content: string): Promise<string> {
		const newPath = join(this._basePath, path);

		await writeFile(newPath, content);

		return newPath;
	}

	async read(path: string): Promise<string> {
		const newPath = join(this._basePath, path);

		return await readFile(newPath, {
			encoding: "utf-8",
		});
	}

	async remove(path: string): Promise<string> {
		const newPath = join(this._basePath, path);

		await rm(newPath);

		return newPath;
	}

	async exists(path: string): Promise<boolean> {
		const newPath = join(this._basePath, path);

		return existsSync(newPath);
	}

	async isFileOrDir(path: string): Promise<"file" | "dir" | false> {
		const newPath = join(this._basePath, path);

		const dataStats = await stat(newPath);

		if (dataStats.isFile()) return "file";
		if (dataStats.isDirectory()) return "dir";
		return false;
	}

	async mkDir(path: string): Promise<string> {
		const newPath = join(this._basePath, path);

		await mkdir(newPath);

		return newPath;
	}

	async rmDir(path: string): Promise<string> {
		const newPath = join(this._basePath, path);

		await rmdir(newPath);

		return newPath;
	}
}
