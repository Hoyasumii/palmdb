import { describe } from "@/global/test";
import { beforeEach, expect, it } from "vitest";
import { CollectionRepository } from "./collection-repository";
import { BaseSchema, InferSchema, schema } from "../schema";
import { string } from "../property";
import { CreateCollection } from "./create-collection";
import { faker } from "@faker-js/faker";
import { PropertyBase } from "../property/property-base";
import { EntityExistsError, EntityNotMatchWithSchemaError } from "@/errors";

type Keys = string;
type Schema = {
  name: PropertyBase<"string", false>;
  email: PropertyBase<"string", false>;
};
type EntityType = InferSchema<BaseSchema<string, Schema>>;

let repo: CollectionRepository<Keys, Schema, EntityType>;
let sut: CreateCollection<Keys, Schema, EntityType>;

await describe("Testing Create Collection", () => {
  beforeEach(() => {
    repo = new CollectionRepository({
      items: {},
      collectionName: "account",
      schema: schema({
        name: string({}),
        email: string({ unique: true }),
      }),
    });
    sut = new CreateCollection(repo);
  });

  it("should create an entity in collection", async () => {
    await expect(
      sut.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
      })
    ).resolves.toBeTypeOf("string");
  });

  it("should not create an entity with repeated unique property", async () => {
    const repeatedEmail = faker.internet.email();

    await sut.create({
      name: faker.person.fullName(),
      email: repeatedEmail,
    });

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
