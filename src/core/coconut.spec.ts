import { describe } from "@/global/test";
import { Coconut } from "./coconut";
import { beforeEach, expect, it } from "vitest";

await describe("Testing Coconut Lock", () => {
	let sut: Coconut;

	beforeEach(() => {
		sut = new Coconut();
	});

	it("should control asynchronous calls", async () => {
		const initialTime = Date.now();

		async function run(_: string) {
			await sut.letMeKnowWhenAvailable();
			await new Promise((r) => setTimeout(r, 10));
			sut.release();
		}

		run("A");
		run("B");
		run("C");

		await sut.letMeKnowWhenAvailable();

		expect(Date.now() - initialTime).toBeGreaterThanOrEqual(30);

		await sut.release();
	});
});
