import { describe } from "@/global/test";
import { ResourceRequester } from "./resource-requester";
import { beforeEach, expect, it } from "vitest";

await describe("Testing Coconut Lock", () => {
	let sut: ResourceRequester;

	beforeEach(() => {
		sut = new ResourceRequester();
	});

	it("should control asynchronous calls", async () => {
		const initialTime = Date.now();

		async function run(_: string) {
			await sut.acquire();
			await new Promise((r) => setTimeout(r, 10));
			sut.release();
		}

		run("A");
		run("B");
		run("C");

		await sut.acquire();

		expect(Date.now() - initialTime).toBeGreaterThanOrEqual(30);

		sut.release();
	});
});
