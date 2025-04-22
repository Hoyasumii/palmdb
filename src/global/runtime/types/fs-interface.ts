import type { FileInterface } from "./file-interface";

export interface FSInterface {
	touch(filename: string): Promise<string>;
	rm(path: string, recursive?: boolean): Promise<boolean>;
	mkDir(dirname: string): Promise<string>;
	exists(path: string): boolean;
	isFileOrDir(path: string): Promise<"file" | "dir" | false>;
	file: FileInterface;
}
