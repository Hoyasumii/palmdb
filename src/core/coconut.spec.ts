import { describe } from "@/test";
import { Coconut } from "./coconut";
import { beforeEach, expect, it } from "vitest";

describe("Testing Coconut Lock", () => {
	let sut: Coconut;

	beforeEach(() => {
		sut = new Coconut();
	});

	it("should control asynchronous calls", async () => {
		const initialTime = Date.now();

		async function run(id: string) {
			await sut.letMeKnowWhenAvailable();
			await new Promise((r) => setTimeout(r, 10));
			sut.release();
		}

		run("A");
		run("B");
		run("C");

		await sut.letMeKnowWhenAvailable();

		expect(Date.now() - initialTime).toBeGreaterThanOrEqual(30);
		expect(Date.now() - initialTime).toBeLessThanOrEqual(35);

		await sut.release();
	});
});
