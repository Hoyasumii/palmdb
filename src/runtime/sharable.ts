import { join } from "@/global/utils";


export abstract class Sharable {
	protected getFilename(filename: string): string {
		return join(global.palm.info.currDir, filename);
	}
}
