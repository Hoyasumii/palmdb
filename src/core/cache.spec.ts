import { describe } from "@/global/test";
import { beforeEach, expect, it } from "vitest";
import { Cache } from "./cache";
import { randomUUID } from "node:crypto";

let sut: Cache;

await describe("Testing Sea Cache", () => {
  beforeEach(() => {
    sut = new Cache("account");
  })

  it("Check if inexistent item exists", () => {
    expect(sut.exists("account/name/alan")).toBeFalsy();
  });

  it("Check if existent item exists", () => {
    sut.set({ path: "account/name", key: "Alan", id: randomUUID() });
    expect(sut.exists("account/name/Alan")).toBeTruthy();
  });

  it("should get an uuid from an existent item", () => {
    const uuid = randomUUID();

    sut.set({ path: "account/name", key: "Alan", id: uuid });
    expect(sut.get("account/name/Alan")).toBe(uuid);
  })
});
