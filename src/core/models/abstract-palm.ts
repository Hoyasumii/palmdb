import type { PalmConfig } from "@/types";
import type { z, ZodObject, ZodRawShape } from "zod";
import type { FSInterface, ProviderInterface } from "@/core/providers/types";
import nodeProvider from "@/core/providers/node";
import { join } from "node:path";
import type {
	CollectionInterface,
	EntityInterface,
	PalmInterface,
} from "@/core/types";
import { Coconut } from "@/core";
import settingPalmProcess from "@/setting-palm-process";

export abstract class AbstractPalm<
	Keys extends string,
	Values extends Record<Keys, ZodObject<ZodRawShape>>,
> implements PalmInterface<Keys, Values>
{
	protected isStarted = false;
	protected provider: ProviderInterface;
	protected coconut = new Coconut();
	public fs: FSInterface;

	constructor(
		protected config: PalmConfig<Keys, Values>,
		providerType: "node" | "bun" = "node",
	) {
		settingPalmProcess(config.secret);

		if (providerType === "bun") throw new Error();

		this.provider = nodeProvider;

		this.fs = this.provider.fs;
	}

	private async useDirOrCreateIt(directory: string): Promise<void> {
		if (!this.provider.fs.exists(directory)) {
			await this.provider.fs.mkDir(directory);
		}
	}

	public async start(): Promise<void> {
		await this.useDirOrCreateIt(process.palm.dbFolderPath);
		await this.useDirOrCreateIt(join(process.palm.dbFolderPath, "store"));
		this.isStarted = true;
	}

	public abstract pick<BaseEntity extends keyof typeof this.config.schema>(
		target: Keys,
	): Promise<CollectionInterface<BaseEntity, EntityInterface<BaseEntity>>>;
}
