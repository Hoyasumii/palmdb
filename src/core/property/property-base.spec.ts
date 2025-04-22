import { describe } from "@/global/test";
import { expect, it } from "vitest";
import { PropertyBase } from "./property-base";

describe("Testing Property Base", () => {
  it("should create a property", () => {
    const newProperty = new PropertyBase({ type: "string" });

    expect(newProperty.type).toBe("string");
    expect(newProperty.nullable).toBe(false);
    expect(newProperty.unique).toBe(false);
  });

  it("should create a nullable property", () => {
    const newProperty = new PropertyBase({ type: "string", nullable: true });

    expect(newProperty.nullable).toBe(true);
  });
  
  it("should create a unique property", () => {
    const newProperty = new PropertyBase({ type: "string", unique: true });

    expect(newProperty.unique).toBe(true);
  });
})