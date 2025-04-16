import { describe, it, expect, beforeAll } from "vitest";
import { Provider } from "./provider";
import { cwd } from "node:process";
// import { randomUUIDv7 } from "bun";
import { z } from "zod";

describe("Testing Node.js Provider", () => {
	let sut: Provider;
	const currDir = cwd();

	beforeAll(() => {
		sut = new Provider(currDir);
	});

	it("should write a new file", async () => {
		await expect(sut.save("testing.txt", "hello world")).resolves.toBeDefined();
	});

	it.todo("should get a file content");

	it("should get a randomUUID", () => {
		const uuidSchema = z.string().uuid();
		const targetUUID = sut.randomUUID();

    console.log(Bun.randomUUIDv7());

		expect(uuidSchema.safeParse(targetUUID).success).toBeTruthy();
	});
});
