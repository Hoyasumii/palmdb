import type {
	FileProviderInterface,
	ProviderInterface,
} from "@/core/providers/types";
import { randomUUID } from "node:crypto";

export class Provider implements ProviderInterface {
	constructor(
		public basePath: string,
		public fileService: FileProviderInterface,
	) {}

	async get(path: string) {
		
	}

	// async save

	randomUUID(): string {
		return randomUUID();
	}
}
