export interface FileInterface {
	write(path: string, content: string): Promise<string>;
	read(path: string): Promise<string>;
}
