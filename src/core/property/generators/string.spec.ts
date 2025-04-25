import { describe } from "@/global/test";
import { expect, it } from "vitest";
import { string } from "./string";

await await describe("Testing String Generator for Property Base", () => {
  it("should create a property", () => {
    const newProperty = string({ });

    expect(newProperty.type).toBe("string");
    expect(newProperty.nullable).toBe(false);
    expect(newProperty.unique).toBe(false);
  });

  it("should create a nullable string property", () => {
    const newProperty = string({ nullable: true });

    expect(newProperty.nullable).toBe(true);
  });
  
  it("should create a unique property", () => {
    const newProperty = string({ unique: true });

    expect(newProperty.unique).toBe(true);
  });
})