import { describe } from "@/global/test";
import { beforeEach, expect, it } from "vitest";
import { CollectionRepository } from "./collection-repository";
import { PropertyBase } from "../property/property-base";
import { BaseSchema, InferSchema, schema } from "../schema";
import { CreateCollection } from "./create-collection";
import { FindCollection } from "./find-collection";
import { UpdateCollection } from "./update-collection";
import { string } from "../property";
import { faker } from "@faker-js/faker";
import { EntityExistsError, EntityNotMatchWithSchemaError } from "@/errors";

type Keys = string;
type Schema = {
  name: PropertyBase<"string", false>;
  email: PropertyBase<"string", false>;
};
type EntityType = InferSchema<BaseSchema<string, Schema>>;

let repo: CollectionRepository<Keys, Schema, EntityType>;
let createSUT: CreateCollection<Keys, Schema, EntityType>;
let findSUT: FindCollection<Keys, Schema, EntityType>;
let sut: UpdateCollection<Keys, Schema, EntityType>;

await describe("Testing Update Collection", () => {
  beforeEach(() => {
    repo = new CollectionRepository({
      collectionName: "account",
      schema: schema({
        name: string({}),
        email: string({ unique: true }),
      }),
    });

    createSUT = new CreateCollection(repo);
    findSUT = new FindCollection(repo);
    sut = new UpdateCollection(repo);
  });

  it("should update a unique entity and _updatedAt must be defined", async () => {
    const entityId = await createSUT.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });

    const updatedEntity = await sut.unique({
      where: entityId,
      data: {
        name: "Testing Name",
      },
    });

    expect(updatedEntity.name).toBe("Testing Name");
    expect(updatedEntity._updatedAt).toBeDefined();
  });

  it("should update a unique entity and validates a entry", async () => {
    const entityId = await createSUT.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });

    await expect(
      sut.unique({
        where: entityId,
        data: {
          name: 1 as unknown as string,
        },
      })
    ).rejects.toBeInstanceOf(EntityNotMatchWithSchemaError);
  });

  it("shouldn't update a unique entity with repeated property at cache", async () => {
    await createSUT.create({
      name: faker.person.fullName(),
      email: "generic@email.com",
    });

    const entityId = await createSUT.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });

    await expect(
      sut.unique({
        where: entityId,
        data: {
          email: "generic@email.com",
        },
      })
    ).rejects.toBeInstanceOf(EntityExistsError);
  });

  it("should update an unique entity with repeated property with an same id", async () => {
    const entityId = await createSUT.create({
      name: faker.person.fullName(),
      email: "generic2@email.com",
    });

    const updatedEntity = await sut.unique({
      where: entityId,
      data: (entity) => ({
        ...entity,
        email: "generic2@email.com",
      }),
    });

    expect(updatedEntity._updatedAt).toBeDefined();
  });
});
