import type { ProviderInterface } from "@/core/providers/types";
import { join } from "node:path";
import { cwd } from "node:process";
import { FileProvider } from "./file-provider";
import { randomUUID } from "node:crypto";

export class Provider implements ProviderInterface {
	public _basePath: string;
	public file: FileProvider;

	constructor(basePath: string) {
		this._basePath = join(cwd(), basePath);
		this.file = new FileProvider(this._basePath);
	}

  // async save

	randomUUID(): string {
		return randomUUID();
	}
}
