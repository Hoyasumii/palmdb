import { describe } from "@/global/test";
import { expect, it } from "vitest";
import { schema } from ".";
import { string } from "../property";
import { getUniqueProperties } from "./get-unique-properties";

const targetSchema = schema({
  name: string({}),
  email: string({ unique: true }),
});

await describe("Testing Get Unique Properties", () => {
  it("should get unique properties from target schema", () => {
    expect(getUniqueProperties(targetSchema)).toMatchObject(["email"]);
  });
});
