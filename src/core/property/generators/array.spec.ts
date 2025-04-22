import { describe } from "@/global/test";
import { expect, it } from "vitest";
import { array } from "./array";

describe("Testing Array Generator for Property Base", () => {
  it("should create a property", () => {
    const newProperty = array({ });

    expect(newProperty.type).toBe("array");
    expect(newProperty.nullable).toBe(false);
    expect(newProperty.unique).toBe(false);
  });

  it("should create a nullable array property", () => {
    const newProperty = array({ nullable: true });

    expect(newProperty.nullable).toBe(true);
  });
  
  it("should create a unique property", () => {
    const newProperty = array({ unique: true });

    expect(newProperty.unique).toBe(true);
  });
})