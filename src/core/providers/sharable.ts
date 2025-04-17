// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import { join } from "path";

export abstract class Sharable {
	protected getFilename(filename: string): string {
		return join(process.palm.currDir, filename);
	}
}
