import type { ProviderInterface } from "@/core/providers/types";
import { randomUUID } from "node:crypto";
import { FS } from "./fs";

export class Provider implements ProviderInterface {
	public fs = new FS();

	async get(path: string) {
		if (!(await this.fs.exists(path))) throw new Error();

		return await this.fs.file.read(path);
	}

	async save(path: string, data: string) {
		return await this.fs.file.write(path, data);
	}

	randomUUID(): string {
		return randomUUID();
	}
}
