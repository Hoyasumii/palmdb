import type { PalmInterface, CollectionInterface } from "@/core/types";
import { Coconut } from "./coconut";
import type { z, ZodObject, ZodRawShape } from "zod";
import type { PalmConfig } from "@/types";
import type { ProviderInterface } from "@/core/providers/types";
import nodeProvider from "./providers/node";
import { join } from "node:path";
import { Collection } from "./collection";
import type { EntityType } from "./entity-type";

export class Palm<
	Keys extends string,
	Values extends Record<string, ZodObject<ZodRawShape>>,
> implements PalmInterface<Keys, Values>
{
	coconut = new Coconut();
	public provider: ProviderInterface;

	constructor(
		public config: PalmConfig<Keys, Values>,
		public providerType: "node" | "bun" = "node",
	) {
		if (providerType === "bun") throw new Error();

		this.provider = nodeProvider;
	}

	async start() {
		if (!this.provider.fs.exists(process.palm.dbFolderPath)) {
			await this.provider.fs.mkDir(process.palm.dbFolderPath);
		}

		if (!this.provider.fs.exists(join(process.palm.dbFolderPath, "store"))) {
			await this.provider.fs.mkDir(join(process.palm.dbFolderPath, "store"));
		}
	}

	database = { export: null, import: null };

	async pick<TargetKeys extends keyof typeof this.config.schema>(
		target: TargetKeys,
	): Promise<CollectionInterface<z.infer<Values[TargetKeys]>>> {
		const collectionPath = join(
			process.palm.dbFolderPath,
			`${target as string}.json`,
		);

		if (!this.provider.fs.exists(collectionPath)) {
			await this.provider.fs.file.write(collectionPath, "{}");
		}

		const collectionContent = JSON.parse(
			await this.provider.fs.file.read(collectionPath),
		) as Record<string, EntityType<object>>;

		return new Collection(
			collectionContent,
			this.coconut,
			this.config.schema[target],
			this.provider.randomUUID,
			async () => {
				await this.provider.save(
					collectionPath,
					JSON.stringify(collectionContent, null, 2),
				);
			},
		);
	}
}
