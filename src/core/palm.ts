import type { CollectionInterface, EntityInterface } from "@/core/types";
import type { z, ZodObject, ZodRawShape } from "zod";
import { join } from "node:path";
import { Collection } from "./_collection";
import type { Entity } from "./entity";
import { AbstractPalm } from "./models";

export class Palm<
	Keys extends string,
	Values extends Record<string, ZodObject<ZodRawShape>>,
> extends AbstractPalm<Keys, Values> {
	async pick<BaseEntity extends keyof typeof this.config.collections>(
		target: BaseEntity,
	): Promise<CollectionInterface<BaseEntity, EntityInterface<BaseEntity>>> {
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
		) as Record<string, Entity<object>>;

		// TODO: Deserialize Entity.data and Serialize in build

		return new Collection(
			collectionContent,
			this.coconut,
			this.config.schema[target],
			this.provider.randomUUID,
			async () => {
				// TODO: Esse save precisa deserializar as Entidades antes de salvar
				await this.provider.save(
					collectionPath,
					JSON.stringify(collectionContent, null, 2),
				);
			},
		) as unknown as CollectionInterface<
			BaseEntity,
			EntityInterface<BaseEntity>
		>;
	}
}
// TODO: Criar Events(comportamentos) para Collections específicas, ou para o palm em específico. exemplo: events({ collection: "account", when: "read" }, () => blabla)
// TODO: Criar opções para ativar um Logger, que pode ser nativo, ou personalizado
// TODO: Criar Erros costumizados
// TODO:
