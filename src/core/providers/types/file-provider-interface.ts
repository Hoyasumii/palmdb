export interface FileProviderInterface {
	_basePath: string;

	write(path: string, content: string): Promise<string>;
	read(path: string): Promise<string>;
	remove(path: string): Promise<string>;
	exists(path: string): Promise<boolean>;
	isFileOrDir(path: string): Promise<"file" | "dir" | false>;
	mkDir(path: string): Promise<string>;
	rmDir(path: string): Promise<string>;
}
