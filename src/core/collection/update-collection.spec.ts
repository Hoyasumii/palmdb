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
        email: string({}),
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

  it.todo("should update a unique entity and validates a entry");
});
