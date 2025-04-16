import type { FileProviderInterface } from "./file-provider-interface";

export interface ProviderInterface {
	basePath: string;
	fs: FileProviderInterface;
	randomUUID(): string;

	get(path: string): Promise<string>;
	save(path: string, data: string): Promise<string>;
}
