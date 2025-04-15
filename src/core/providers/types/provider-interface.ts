import type { FileProviderInterface } from "./file-provider-interface";

export interface ProviderInterface {
	_basePath: string;
	randomUUID(): string;

	get(path: string): Promise<string>;
	save(data: Record<string, unknown>): Promise<void>;
	file: FileProviderInterface;
}
