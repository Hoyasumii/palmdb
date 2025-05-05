// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import { join, posix } from "path";

export abstract class Sharable {
	protected getFilename(filename: string): string {
		return posix.join(global.palm.info.currDir, filename);
	}
}
