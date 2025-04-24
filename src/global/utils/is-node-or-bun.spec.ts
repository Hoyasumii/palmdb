import { expect, it } from "vitest";
import { describe } from "../test";
import { isNodeOrBun } from "./is-node-or-bun";

await describe("Testing isNodeOrbBun in Node", () => {
  it("should identifies Node", () => {
    expect(isNodeOrBun()).toBe("node");
  })
});