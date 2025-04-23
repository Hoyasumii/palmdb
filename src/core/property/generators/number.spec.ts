import { describe } from "@/global/test";
import { expect, it } from "vitest";
import { number } from "./number";

describe("Testing Number Generator for Property Base", () => {
  it("should create a property", () => {
    const newProperty = number({ });

    expect(newProperty.type).toBe("number");
    expect(newProperty.nullable).toBe(false);
    expect(newProperty.unique).toBe(false);
  });

  it("should create a nullable number property", () => {
    const newProperty = number({ nullable: true });

    expect(newProperty.nullable).toBe(true);
  });
  
  it("should create a unique property", () => {
    const newProperty = number({ unique: true });

    expect(newProperty.unique).toBe(true);
  });
})