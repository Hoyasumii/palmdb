import type {
	FileProviderInterface,
	ProviderInterface,
} from "@/core/providers/types";
import { randomUUID } from "node:crypto";
import { FileProvider } from "./file-provider";

export class Provider implements ProviderInterface {
	public fs: FileProviderInterface;

	constructor(public basePath: string) {
		this.fs = new FileProvider(basePath);
	}

	async get(path: string) {
		if (!(await this.fs.exists(path))) throw new Error();

		return await this.fs.read(path);
	}

	async save(path: string, data: string) {
		return await this.fs.write(path, data);
	}

	randomUUID(): string {
		return randomUUID();
	}
}
