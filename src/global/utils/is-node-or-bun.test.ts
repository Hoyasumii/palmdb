import { expect, it } from "vitest";
import { describe } from "../test";
import { isNodeOrBun } from "./is-node-or-bun";

await describe("Testing isNodeOrbBun in Bun", () => {
  it("should identifies Bun", () => {
    expect(isNodeOrBun()).toBe("bun");
  })
});