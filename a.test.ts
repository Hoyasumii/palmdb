import { describe } from "@/test";
import { randomUUIDv7 } from "bun";
import { expect, it } from "vitest";
// import "@/setting-process-palm";

describe("1+1", () => {
	it("should returns 2", () => {
		console.log(process.palm.currDir)
		console.log(randomUUIDv7());
		expect(1 + 1).toBe(2);
	});
});
