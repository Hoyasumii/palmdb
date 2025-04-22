import { describe } from "@/global/test";
import { expect, it } from "vitest";
import { json } from "./json";

describe("Testing JSON Generator for Property Base", () => {
  it("should create a property", () => {
    const newProperty = json({ });

    expect(newProperty.type).toBe("json");
    expect(newProperty.nullable).toBe(false);
    expect(newProperty.unique).toBe(false);
  });

  it("should create a nullable json property", () => {
    const newProperty = json({ nullable: true });

    expect(newProperty.nullable).toBe(true);
  });
  
  it("should create a unique property", () => {
    const newProperty = json({ unique: true });

    expect(newProperty.unique).toBe(true);
  });
})