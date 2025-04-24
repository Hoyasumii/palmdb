import { describe } from "@/global/test";
import { SchemaValidator } from "./schema-validator";
import { schema } from ".";
import { boolean, string } from "../property";
import { expect, it } from "vitest";

const targetSchema = schema({
  name: string({ nullable: true }),
  gender: boolean({}),
});

const sut = new SchemaValidator(targetSchema);

await describe("Testing Schema Validator", () => {
  it("should validate an valid schema", () => {
    expect(sut.validate({
      name: "John Doe",
      gender: true
    })).toBeTruthy();
  });

  it("should not validate an invalid schema", () => {
    expect(sut.validate({
      name: {} as string,
      gender: false
    })).toBeFalsy();
  });
});
