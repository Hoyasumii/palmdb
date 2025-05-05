import { describe } from "@/global/test";
import { expect, it } from "vitest";
import { Cache } from "./cache";
import { randomUUID } from "node:crypto";

const sut = new Cache("account");

await describe("Testing Sea Cache", () => {
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
