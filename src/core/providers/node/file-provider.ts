import type { FileProviderInterface } from "@/core/providers/types";
import { existsSync } from "node:fs";
import { readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";

export class FileProvider implements FileProviderInterface {
	constructor(public _basePath: string) {}
  
	// TODO: Verificar se os arquivos existem.
	// TODO: Verificar se o path é arquivo ou pasta.

	async create(path: string, content: Buffer): Promise<string> {
		const newPath = join(this._basePath, path);

		await writeFile(newPath, content);

		return newPath;
	}

	async get(path: string): Promise<string> {
		const newPath = join(this._basePath, path);

		return await readFile(newPath, {
			encoding: "utf-8",
		});
	}

	async remove(path: string): Promise<boolean> {
		const newPath = join(this._basePath, path);

		const existFile = existsSync(newPath);

		await rm(newPath);

		return existFile;
	}
}
