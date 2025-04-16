import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Provider } from "./provider";
import { cwd } from "node:process";
import { z } from "zod";

describe("Testing Node.js Provider", () => {
	let sut: Provider;
	const currDir = cwd();

	beforeAll(() => {
		sut = new Provider(currDir);
	});

	afterAll(async () => {
		await sut.fs.remove("testing.txt");
	});

	it("should write a new file", async () => {
		await expect(sut.save("testing.txt", "hello world")).resolves.toBeDefined();
	});

	it("should get a file content", async () => {
		await expect(sut.get("testing.txt")).resolves.toBeDefined();
	});

	it("should get a randomUUID", () => {
		const uuidSchema = z.string().uuid();
		const targetUUID = sut.randomUUID();

		expect(uuidSchema.safeParse(targetUUID).success).toBeTruthy();
	});
});
