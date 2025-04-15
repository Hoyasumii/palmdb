import type { FileProviderInterface } from "./file-provider-interface";

export interface ProviderInterface {
	basePath: string;
	fileService: FileProviderInterface;
	randomUUID(): string;

	get(path: string): Promise<string>;
	// save(data: Record<string, unknown>): Promise<void>;
}
