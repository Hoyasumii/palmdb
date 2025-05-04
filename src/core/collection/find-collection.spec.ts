import { describe } from "@/global/test";
import { beforeEach, expect, it } from "vitest";
import { PropertyBase } from "../property/property-base";
import { BaseSchema, InferSchema, schema } from "../schema";
import { CollectionRepository } from "./collection-repository";
import { FindCollection } from "./find-collection";
import { CreateCollection } from "./create-collection";
import { string } from "../property";
import { faker } from "@faker-js/faker";
import { randomUUID } from "node:crypto";
import { ResourceNotFoundError } from "@/errors";

type Keys = string;
type Schema = {
  name: PropertyBase<"string", false>;
  email: PropertyBase<"string", false>;
};
type EntityType = InferSchema<BaseSchema<string, Schema>>;

let repo: CollectionRepository<Keys, Schema, EntityType>;
let createCollectionSUT: CreateCollection<Keys, Schema, EntityType>;
let sut: FindCollection<Keys, Schema, EntityType>;

await describe("Testing Find Collection", () => {
  beforeEach(() => {
    repo = new CollectionRepository({
      collectionName: "account",
      schema: schema({
        name: string({}),
        email: string({}),
      }),
    });

    createCollectionSUT = new CreateCollection(repo);
    sut = new FindCollection(repo);
  });

  it("should find a unique entity", async () => {
    const entityId = await createCollectionSUT.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });

    const { _id } = await sut.unique(entityId);

    expect(_id).toEqual(entityId);
  });

  it("should throw ResourceNotFoundError when try finds an inexistent unique entity", async () => {
    await expect(sut.unique(randomUUID())).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });

  it("should generate 10 entities and find 5 entities with same name", async () => {
    const targetName = faker.person.fullName();

    for (let index = 0; index < 5; index++) {
      await createCollectionSUT.create({
        name: targetName,
        email: faker.internet.email(),
      });

      await createCollectionSUT.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
      });
    }

    const findManyOperation = await sut.many({
      where: (entity) => entity.name === targetName,
    });

    expect(findManyOperation.data.length).toBe(5);
  });

  it("should generate 40 entities, find 20 entities with same name, then limit 5 entities per page", async () => {
    const targetName = faker.person.fullName();

    for (let index = 0; index < 20; index++) {
      await createCollectionSUT.create({
        name: targetName,
        email: faker.internet.email(),
      });

      await createCollectionSUT.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
      });
    }

    const findManyOperation = await sut.many({
      where: (entity) => entity.name === targetName,
      limit: 5,
      page: 0,
    });

    expect(findManyOperation.data.length).toBe(5);
  });

  it("should find 20 entities with same name, limit 5 entities per page, and verify if the 4 other pages has continuous data, comparing with an Collection who filtered 20 entities with no limit.", async () => {
    const targetName = faker.person.fullName();

    for (let index = 0; index < 20; index++) {
      await createCollectionSUT.create({
        name: targetName,
        email: faker.internet.email(),
      });
    }

    const allEntitiesWithSameName = await sut.many({
      where: (entity) => entity.name === targetName,
    });

    for (let page = 0; page < 4; page++) {
      const limit = 5;

      const targetEntityPage = await sut.many({
        where: (entity) => entity.name === targetName,
        limit,
        page,
      });

      const targetPage = allEntitiesWithSameName.data.slice(
        limit * page,
        limit * (page + 1)
      );

      expect(targetPage).toMatchObject(targetEntityPage.data);
    }
  });
});
