export interface FileProviderInterface {
	_basePath: string;

	create(path: string, content: Buffer | Blob): Promise<string>;
	get(path: string): Promise<string>;
	remove(path: string): Promise<boolean>;
}
