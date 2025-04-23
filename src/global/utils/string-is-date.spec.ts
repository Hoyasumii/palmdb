import { expect, it } from "vitest";
import { describe } from "../test";
import { stringIsDate } from "./string-is-date";

describe("Testing String Is Date Method", () => {
  it("should refuse if value is a fake date", () => {
    expect(stringIsDate("Hello World")).toBeFalsy();
  });

  it("should approve if value is a real date", () => {
    expect(stringIsDate(new Date().toISOString())).toBeTruthy();
  });
});
