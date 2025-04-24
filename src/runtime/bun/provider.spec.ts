import { it, expect, afterAll, beforeEach } from "vitest";
import { Provider } from "./provider";
import { describe } from "@/global/test";

await describe("Testing Bun Provider", () => {
	let sut: Provider;

	beforeEach(() => {
		sut = new Provider();
	});

	afterAll(async () => {
		await sut.fs.rm("testing.txt");
	});

	it("should write a new file", async () => {
		await expect(sut.save("testing.txt", "hello world")).resolves.toBeDefined();
	});

	it("should get a file content", async () => {
		await expect(sut.get("testing.txt")).resolves.toBeDefined();
	});

	it("should get a randomUUID", () => {
		const targetUUID = sut.randomUUID();

		expect(targetUUID).toBeDefined();
	});
});
