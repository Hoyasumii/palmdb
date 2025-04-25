import { describe } from "@/global/test";
import { expect, it } from "vitest";
import { CollectionUniquenessChecker } from "./collection-uniquess-checker";
import { schema, type InferSchema } from "../schema";
import { string } from "../property";
import { getUniqueProperties } from "../schema/get-unique-properties";

const accountSchema = schema({
  name: string({}),
  email: string({ unique: true }),
});

type Keys = keyof InferSchema<typeof accountSchema>;
type Schema = typeof accountSchema.value;
type EntityType = InferSchema<typeof accountSchema>;

const sut = new CollectionUniquenessChecker<Keys, Schema, EntityType>({
  uniqueProperties: getUniqueProperties(accountSchema),
  collectionPath: "account",
});

await describe("Testing Collection Uniquess Checker", () => {
  it("should return true to a new value", () => {
    expect(
      sut.entityIsUnique({ email: "genericemail@gmail.com", name: "Alberto" })
    ).toBeTruthy();
  });

  it("should return false to a repeated value", () => {
    global.palm.cache.set("account/email", "genericemail@gmail.com");

    expect(
      sut.entityIsUnique({ email: "genericemail@gmail.com", name: "Alberto" })
    ).toBeFalsy();
  });
});
