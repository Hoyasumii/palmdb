import type { CollectionInterface } from "@/core/types";
import type { z, ZodObject, ZodRawShape } from "zod";
import { join } from "node:path";
import { Collection } from "./collection";
import type { EntityType } from "./entity-type";
import { AbstractPalm } from "./models";

export class Palm<
	Keys extends string,
	Values extends Record<string, ZodObject<ZodRawShape>>,
> extends AbstractPalm<Keys, Values> {
	async pick<TargetKeys extends keyof typeof this.config.schema>(
		target: TargetKeys,
	): Promise<CollectionInterface<z.infer<Values[TargetKeys]>>> {
		if (!this.isStarted) throw new Error();

		// TODO: Criar uma persistência nos dados a serem recebidos, validando os dados na leitura e emitindo erro caso algum dos dados a serem lidos não coincidam com o schema desejado.
		// TODO: Tirar o data dos dados salvos.
		// TODO: Criar uma feature para caso ocorra uma mudança nos schemas, oferecendo uma mudança total dos dados, ou uma mudança para null nesses novos dados

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
