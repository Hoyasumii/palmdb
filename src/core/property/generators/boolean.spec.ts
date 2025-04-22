import { describe } from "@/global/test";
import { expect, it } from "vitest";
import { boolean } from "./boolean";

describe("Testing Boolean Generator for Property Base", () => {
  it("should create a property", () => {
    const newProperty = boolean({ });

    expect(newProperty.type).toBe("boolean");
    expect(newProperty.nullable).toBe(false);
    expect(newProperty.unique).toBe(false);
  });

  it("should create a nullable boolean property", () => {
    const newProperty = boolean({ nullable: true });

    expect(newProperty.nullable).toBe(true);
  });
  
  it("should create a unique property", () => {
    const newProperty = boolean({ unique: true });

    expect(newProperty.unique).toBe(true);
  });
})