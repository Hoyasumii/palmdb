export interface FileInterface {
	write(path: string, content: Buffer): Promise<string>;
	read(path: string): Promise<string>;
}
