import type { FSInterface } from "./fs-interface";

export interface ProviderInterface {
	fs: FSInterface;
	randomUUID(): string;

	get(path: string): Promise<string>;
	save(path: string, data: string): Promise<string>;
}
