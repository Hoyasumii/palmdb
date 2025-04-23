import { describe } from "@/global/test";
import { expect, it } from "vitest";
import { date } from "./date";

describe("Testing Date Generator for Property Base", () => {
  it("should create a property", () => {
    const newProperty = date({ });

    expect(newProperty.type).toBe("date");
    expect(newProperty.nullable).toBe(false);
    expect(newProperty.unique).toBe(false);
  });

  it("should create a nullable date property", () => {
    const newProperty = date({ nullable: true });

    expect(newProperty.nullable).toBe(true);
  });
  
  it("should create a unique property", () => {
    const newProperty = date({ unique: true });

    expect(newProperty.unique).toBe(true);
  });
})