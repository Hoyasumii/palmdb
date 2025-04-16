import { randomUUIDv7 } from "bun";
import { describe, expect, it } from "bun:test";

describe("1+1", () => {
	it("should returns 2", () => {
		console.log(randomUUIDv7());
		expect(1 + 1).toBe(2);
	});
});
