import { describe } from "@/global/test";
import { expect, it } from "vitest";
import { propertyValidator } from "./property-validator";
import { array, boolean, date, json, number, string } from "./generators";

await describe("Testing Property Validator", () => {
  it("should approve null to be a <Unknown Nullable Property>", () => {
    expect(propertyValidator(string({ nullable: true }), null)).toBeTruthy();
  });

  it("should approve a string value to be a <String Property>", () => {
    expect(propertyValidator(string({}), "Hello World")).toBeTruthy();
  });
  it("should reprove an other type to be a <String Property>", () => {
    expect(propertyValidator(string({}), 1 as unknown as string)).toBeFalsy();
  });

  it("should approve a number to be a <Number Property>", () => {
    expect(propertyValidator(number({}), 1)).toBeTruthy();
  });
  it("should reprove an other type to be a <Number Property>", () => {
    expect(propertyValidator(number({}), "" as unknown as number)).toBeFalsy();
  });

  it("should approve a boolean to be a <Boolean Property>", () => {
    expect(propertyValidator(boolean({}), true)).toBeTruthy();
  });
  it("should reprove an other type to be a <Boolean Property>", () => {
    expect(
      propertyValidator(boolean({}), "" as unknown as boolean)
    ).toBeFalsy();
  });

  it("should approve a date to be a <Date Property>", () => {
    expect(propertyValidator(date({}), new Date().toISOString())).toBeTruthy();
  });
  it("should reprove an invalid date to be a <Date Property>", () => {
    expect(propertyValidator(date({}), "Hello World")).toBeFalsy();
  });

  it("should approve a array to be a <Array Property>", () => {
    expect(propertyValidator(array({}), [])).toBeTruthy();
  });
  it("should reprove an other type to be a <Array Property>", () => {
    expect(
      propertyValidator(array({}), {} as unknown as unknown[])
    ).toBeFalsy();
  });

  it("should approve a json to be a <JSON Property>", () => {
    expect(propertyValidator(json({}), { name: "August" })).toBeTruthy();
  });
  it("should reprove an other type to be a <JSON Property>", () => {
    expect(propertyValidator(json({}), "Testing" as unknown as object)).toBeFalsy();
  });
});
