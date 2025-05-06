import { describe } from "@/global/test";
import { afterAll, beforeEach, expect, it } from "vitest";
import { CollectionRepository } from "./collection-repository";
import { BaseSchema, InferSchema, schema } from "../schema";
import { string } from "../property";
import { CreateCollection } from "./create-collection";
import { faker } from "@faker-js/faker";
import { PropertyBase } from "../property/property-base";
import { EntityExistsError, EntityNotMatchWithSchemaError } from "@/errors";
import { rmSync } from "node:fs";
import { join } from "@/global/utils";

type Keys = string;
type Schema = {
  name: PropertyBase<"string", false>;
  email: PropertyBase<"string", false>;
};
type EntityType = InferSchema<BaseSchema<string, Schema>>;

let repo: CollectionRepository<Keys, Schema, EntityType>;
let sut: CreateCollection<Keys, Schema, EntityType>;

let filenames: Array<string> = [];

function addFilename(filename: string) {
  filenames.push(
    join(
      global.palm.info.currDir,
      global.palm.info.dbFolderPath,
      repo.collectionName,
      `${filename}.msgpack`
    )
  );
}

await describe("Testing Create Collection", () => {
  beforeEach(() => {
    repo = new CollectionRepository({
      collectionName: "account",
      schema: schema({
        name: string({}),
        email: string({ unique: true }),
      }),
    });
    sut = new CreateCollection(repo);
  });

  afterAll(() => {
    for (const filename of filenames) {
      rmSync(filename);
    }
  });

  it("should create an entity in collection", async () => {
    const filename = await sut.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });

    addFilename(filename);

    expect(filename).toBeTypeOf("string");
  });

  it("should not create an entity with repeated unique property", async () => {
    const repeatedEmail = faker.internet.email();

    const uniqueEntity = await sut.create({
      name: faker.person.fullName(),
      email: repeatedEmail,
    });

    addFilename(uniqueEntity);

    await expect(
      sut.create({
        name: faker.person.fullName(),
        email: repeatedEmail,
      })
    ).rejects.toBeInstanceOf(EntityExistsError);
  });

  it("should not create an entity with invalid schema", async () => {
    await expect(
      sut.create({
        name: faker.person.fullName(),
        email: null as never,
      })
    ).rejects.instanceOf(EntityNotMatchWithSchemaError);
  });
});
