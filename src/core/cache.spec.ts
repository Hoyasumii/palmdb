import { describe } from "@/global/test";
import { expect, it } from "vitest";
import { Cache } from "./cache";

const sut = new Cache("account");

await describe("Testing Sea Cache", () => {
  it("Check if inexistent item exists", () => {
    expect(sut.exists("account/name/alan")).toBeFalsy();
  });

  it("Check if existent item exists", () => {
    sut.set("account/name", "Alan");
    expect(sut.exists("account/name/Alan")).toBeTruthy();
  })
})